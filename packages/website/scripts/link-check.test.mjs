import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { prepareLinkCheck } from './link-check.mjs';

test('uses real rendered headings and static assets, preserving missing targets', async () => {
  const root = await mkdtemp(join(tmpdir(), 'website-links-'));
  try {
    for (const directory of ['public', '.next/server/app/news', '.next/static', 'src/app/(site)/news'])
      await mkdir(join(root, directory), { recursive: true });
    await writeFile(join(root, 'public/document.pdf'), 'fixture');
    await writeFile(join(root, '.next/BUILD_ID'), 'test-build');
    await writeFile(join(root, '.next/static/app.js'), 'fixture');
    await writeFile(join(root, 'src/app/(site)/news/page.tsx'), '');
    await writeFile(join(root, 'lychee.toml'), 'index_files = ["index.html"]\n');
    await writeFile(
      join(root, '.next/prerender-manifest.json'),
      JSON.stringify({ routes: { '/news/2026-01-01-01': {}, '/manifest.webmanifest': {} } }),
    );
    await writeFile(join(root, '.next/server/app/manifest.webmanifest.body'), '{"name":"Website"}');
    const article = join(root, '.next/server/app/news/2026-01-01-01.html');
    await writeFile(
      article,
      '<html><head><link rel="canonical" href="https://preview.example.test/news/2026-01-01-01"></head><body><h2 id="heading">Title</h2><a href="#missing">Broken</a><a href="/missing-route">Missing</a></body></html>',
    );
    const output = await prepareLinkCheck(root);
    assert.match(await readFile(join(output.siteDirectory, 'news/2026-01-01-01/index.html'), 'utf8'), /id="heading"/);
    assert.match(await readFile(output.config, 'utf8'), /preview/);
    assert.equal(await readFile(join(output.siteDirectory, 'document.pdf'), 'utf8'), 'fixture');
    assert.equal(await readFile(join(output.siteDirectory, 'manifest.webmanifest'), 'utf8'), '{"name":"Website"}');
    await assert.rejects(readFile(join(output.siteDirectory, 'missing-route/index.html')), { code: 'ENOENT' });
    await writeFile(article, '<a href="hhttps://example.com">Typo</a>');
    await assert.rejects(prepareLinkCheck(root), /Unsupported URL scheme/);
    await rm(article);
    await assert.rejects(prepareLinkCheck(root), /Missing prerendered output/);
  } finally {
    await rm(root, { recursive: true });
  }
});
