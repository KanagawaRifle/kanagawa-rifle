import { readdir, readFile, stat } from 'node:fs/promises';
import { relative, resolve, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

import { JSDOM } from 'jsdom';

const localOrigin = 'https://size-budget.invalid';

/** Extract initial scripts and styles, excluding optional dynamic imports and prefetches. */
export function collectInitialAssets(html, rootDir, route = '/') {
  // A fragment keeps styles inert; collecting URLs does not need a browser window or CSS parsing.
  const document = JSDOM.fragment(html);
  const assets = { javascript: new Set(), stylesheet: new Set() };

  function add(kind, href) {
    const url = new URL(href, new URL(route, localOrigin));
    if (url.origin !== localOrigin) return;

    // URL parsing removes query/hash suffixes, while the HTML parser decodes escaped attributes.
    const pathname = decodeURIComponent(url.pathname);
    const nextAsset = pathname.startsWith('/_next/static/');
    const directory = resolve(rootDir, nextAsset ? '.next/static' : 'public');
    const file = resolve(directory, `.${nextAsset ? pathname.slice('/_next/static'.length) : pathname}`);
    const localPath = relative(directory, file);
    if (localPath === '..' || localPath.startsWith(`..${sep}`)) {
      throw new Error(`Initial asset escapes its output directory: ${href}`);
    }
    assets[kind].add(relative(rootDir, file).split(sep).join('/'));
  }

  for (const script of document.querySelectorAll('script[src]')) {
    add('javascript', script.getAttribute('src'));
  }
  for (const link of document.querySelectorAll('link[href]')) {
    const rel = link.rel.toLowerCase().split(/\s+/);
    const as = link.getAttribute('as')?.toLowerCase();
    if (rel.includes('stylesheet') || (rel.includes('preload') && as === 'style')) {
      add('stylesheet', link.getAttribute('href'));
    } else if (rel.includes('modulepreload') || (rel.includes('preload') && as === 'script')) {
      add('javascript', link.getAttribute('href'));
    }
  }
  // Next.js retains these CSS files for navigation when it embeds their
  // contents in the first response. Count the same stylesheet budget in both modes.
  for (const style of document.querySelectorAll('style[data-href]')) {
    for (const href of style.getAttribute('data-href').trim().split(/\s+/).filter(Boolean)) {
      add('stylesheet', href);
    }
  }

  return {
    javascript: [...assets.javascript].sort(),
    stylesheet: [...assets.stylesheet].sort(),
  };
}

async function requireFile(rootDir, file) {
  let info;
  try {
    info = await stat(resolve(rootDir, file));
  } catch (error) {
    throw new Error(`Size budget input is missing: ${file}. Run the production build first.`, { cause: error });
  }
  if (!info.isFile() || info.size === 0) {
    throw new Error(`Size budget input must be a non-empty file: ${file}. Run the production build first.`);
  }
}

/** Build Size Limit checks directly from the completed Next.js output, without copying chunks. */
export async function prepareSizeBudget({ rootDir, limits }) {
  const appDirectory = '.next/server/app';
  await requireFile(rootDir, '.next/BUILD_ID');
  await requireFile(rootDir, `${appDirectory}/index.html`);

  const htmlFiles = (await readdir(resolve(rootDir, appDirectory), { recursive: true }))
    .filter((file) => file.endsWith('.html'))
    .sort();
  const groups = new Map();
  const validatedAssets = new Set();
  let largestDocument;

  for (const htmlFile of htmlFiles) {
    const relativeFile = `${appDirectory}/${htmlFile}`;
    await requireFile(rootDir, relativeFile);
    const route = htmlFile === 'index.html' ? '/' : `/${htmlFile.slice(0, -'.html'.length).split(sep).join('/')}/`;
    const html = await readFile(resolve(rootDir, relativeFile), 'utf8');
    if (limits.html) {
      const size = gzipSync(html, { level: 9 }).length;
      if (!largestDocument || size > largestDocument.size) largestDocument = { file: relativeFile, route, size };
    }
    const assets = collectInitialAssets(html, rootDir, route);
    if (assets.javascript.length === 0 || (route === '/' && assets.stylesheet.length === 0)) {
      throw new Error(`No initial ${assets.javascript.length === 0 ? 'JavaScript' : 'CSS'} found in ${relativeFile}.`);
    }

    for (const [kind, files] of Object.entries(assets)) {
      if (files.length === 0) continue;
      for (const file of files) {
        if (!validatedAssets.has(file)) {
          await requireFile(rootDir, file);
          validatedAssets.add(file);
        }
      }
      const key = JSON.stringify([kind, files]);
      const existing = groups.get(key);
      if (existing) {
        existing.routes.push(route);
      } else {
        groups.set(key, { kind, files, routes: [route] });
      }
    }
  }

  // Most static pages share their initial assets. Measure each unique set once, with the same per-page budget.
  const checks = [...groups.values()].map(({ kind, files, routes }) => ({
    name: `Initial ${kind === 'javascript' ? 'JS' : 'CSS'}: ${routes[0]}${routes.length > 1 ? ` (+${routes.length - 1} pages)` : ''}`,
    path: files,
    limit: limits[kind],
    gzip: true,
  }));

  // Match @size-limit/file's gzip level and check the largest response, including
  // inline CSS and RSC data. This covers every static page without hundreds of duplicate reports.
  if (largestDocument) {
    checks.push({
      name: `Initial HTML: ${largestDocument.route} (largest of ${htmlFiles.length} pages)`,
      path: [largestDocument.file],
      limit: limits.html,
      gzip: true,
    });
  }

  return checks;
}
