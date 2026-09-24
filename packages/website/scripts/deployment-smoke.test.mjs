// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { checkDeployment } from './deployment-smoke.mjs';

const origin = 'https://preview.example.test';
const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const fixtures = new Map([
  ['/', ['text/html', '<main><link type="application/rss+xml"><script src="/_next/static/app.js"></script></main>']],
  ['/_next/static/app.js', ['application/javascript', 'console.log("loaded")']],
  [
    '/sitemap.xml',
    ['application/xml', '<urlset><url><loc>https://kanagawa-rifle.org/news/2026-01-01-01</loc></url></urlset>'],
  ],
  ['/news/2026-01-01-01', ['text/html', '<main><article><h1>Article</h1></article></main>']],
  ['/api/og', ['image/png', png]],
  ['/api/news', ['application/json', JSON.stringify({ data: { data: [{ slug: '2026-01-01-01' }] } })]],
  [
    '/api/news/2026-01-01-01',
    ['application/json', JSON.stringify({ data: { slug: '2026-01-01-01', content: 'Article' } })],
  ],
]);

function serve(url) {
  const [type, body] = fixtures.get(url.pathname) ?? ['text/plain', 'missing'];
  return new Response(body, { status: fixtures.has(url.pathname) ? 200 : 404, headers: { 'content-type': type } });
}

test('checks the deployment origin even when sitemap URLs point to production', async () => {
  const results = await checkDeployment({
    baseUrl: origin,
    fetchImpl: async (url) => {
      assert.equal(url.origin, origin);
      return serve(url);
    },
  });
  assert.equal(results.length, 7);
  assert.ok(results.some(({ path }) => path === '/news/2026-01-01-01'));
});

test('fails when a deployed JavaScript bundle is missing', async () => {
  await assert.rejects(
    checkDeployment({
      baseUrl: origin,
      fetchImpl: async (url) =>
        url.pathname.includes('/_next/') ? new Response('missing', { status: 404 }) : serve(url),
    }),
    /expected HTTP 200, received 404/,
  );
});

test('does not accept a login page in place of the article', async () => {
  await assert.rejects(
    checkDeployment({
      baseUrl: origin,
      fetchImpl: async (url) =>
        url.pathname === '/news/2026-01-01-01'
          ? new Response('<h1>Log in</h1>', { headers: { 'content-type': 'text/html' } })
          : serve(url),
    }),
    /missing its content/,
  );
});

test('rejects cross-origin redirects', async () => {
  let calls = 0;
  await assert.rejects(
    checkDeployment({
      baseUrl: origin,
      fetchImpl: async () => {
        calls++;
        return new Response(null, { status: 307, headers: { location: 'https://example.com/' } });
      },
    }),
    /Unexpected redirect/,
  );
  assert.equal(calls, 1);
});

test('rejects credentials and insecure remote URLs before making requests', async () => {
  for (const baseUrl of ['http://example.com', 'https://user:password@example.com', 'https://example.com/path']) {
    await assert.rejects(
      checkDeployment({
        baseUrl,
        fetchImpl: () => {
          throw new Error('Must not fetch');
        },
      }),
      /HTTPS|plain deployment|without a path/,
    );
  }
});
