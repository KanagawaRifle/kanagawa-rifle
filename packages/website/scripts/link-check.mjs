// SPDX-License-Identifier: MIT
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

/** Check the actual HTML emitted by Next.js, including the rendered heading IDs. */
export async function prepareLinkCheck(packageDirectory) {
  const outputDirectory = path.join(packageDirectory, '.cache/links');
  const siteDirectory = path.join(outputDirectory, 'site');
  const appDirectory = path.join(packageDirectory, '.next/server/app');
  await readFile(path.join(packageDirectory, '.next/BUILD_ID'), 'utf8');
  const manifest = JSON.parse(await readFile(path.join(packageDirectory, '.next/prerender-manifest.json'), 'utf8'));
  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(siteDirectory, { recursive: true });
  await cp(path.join(packageDirectory, 'public'), siteDirectory, { recursive: true });
  await cp(path.join(packageDirectory, '.next/static'), path.join(siteDirectory, '_next/static'), { recursive: true });
  const processor = unified().use(rehypeRaw).use(rehypeStringify);
  const files = [];
  const origins = new Set(['https://kanagawa-rifle.org']);
  for (const route of Object.keys(manifest.routes)) {
    const input = path.join(appDirectory, route === '/' ? 'index.html' : `${route.slice(1)}.html`);
    let html;
    try {
      html = await readFile(input, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Next.js emits static metadata routes (icons, manifest, sitemap) as bodies.
        const target = path.join(siteDirectory, route);
        try {
          const body = await readFile(path.join(appDirectory, `${route.slice(1)}.body`));
          await mkdir(path.dirname(target), { recursive: true });
          await writeFile(target, body);
        } catch (metadataError) {
          if (metadataError.code === 'ENOENT')
            throw new Error(`Missing prerendered output for ${route}. Run a complete build before checking links.`);
          throw metadataError;
        }
        continue;
      }
      throw error;
    }
    const tree = await processor.run({ type: 'root', children: [{ type: 'raw', value: html }] });
    visit(tree, 'element', (node) => {
      if (node.tagName === 'link' && node.properties.rel?.includes('canonical') && node.properties.href) {
        origins.add(new URL(node.properties.href).origin);
      }
      for (const attribute of ['href', 'src']) {
        const value = node.properties[attribute];
        if (typeof value !== 'string') continue;
        const scheme = /^([a-z][a-z\d+.-]*):/i.exec(value.trim())?.[1]?.toLowerCase();
        if (scheme && !['http', 'https', 'mailto', 'tel', 'data'].includes(scheme)) {
          throw new Error(`Unsupported URL scheme in ${route}: ${value}`);
        }
        if (value.startsWith('//')) node.properties[attribute] = `https:${value}`;
      }
    });
    const target = path.join(siteDirectory, route, 'index.html');
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, processor.stringify(tree));
    if (/^\/news\/\d{4}-\d{2}-\d{2}-\d{2}$/.test(route)) files.push(target);
  }
  if (!files.length) throw new Error('No built news pages found. Run npm run build first.');

  // Dynamic listing pages exist even when there is no prerendered HTML.
  async function addPageTargets(directory, segments = []) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (entry.isDirectory() && !/^[\[_@]/.test(entry.name)) {
        await addPageTargets(
          path.join(directory, entry.name),
          /^\(.*\)$/.test(entry.name) ? segments : [...segments, entry.name],
        );
      } else if (entry.name === 'page.tsx') {
        const target = path.join(siteDirectory, ...segments, 'index.html');
        await mkdir(path.dirname(target), { recursive: true });
        try {
          await writeFile(target, '<!doctype html><html><body></body></html>', { flag: 'wx' });
        } catch (error) {
          if (error.code !== 'EEXIST') throw error;
        }
      }
    }
  }
  await addPageTargets(path.join(packageDirectory, 'src/app'));
  const remap = [...origins].map(
    (origin) => `^${origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/.*)?$ ${pathToFileURL(siteDirectory).href}$1`,
  );
  const config = path.join(outputDirectory, 'lychee.toml');
  await writeFile(
    config,
    `${await readFile(path.join(packageDirectory, 'lychee.toml'), 'utf8')}\nroot_dir = ${JSON.stringify(siteDirectory)}\nremap = ${JSON.stringify(remap)}\n`,
  );
  const inputs = path.join(outputDirectory, 'inputs.txt');
  await writeFile(inputs, `${files.join('\n')}\n`);
  return { config, inputs, outputDirectory, siteDirectory };
}
