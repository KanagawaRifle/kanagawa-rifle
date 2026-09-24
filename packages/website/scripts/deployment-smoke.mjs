// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

export async function checkDeployment({ baseUrl, fetchImpl = fetch }) {
  const base = new URL(baseUrl);
  assert.equal(base.pathname, '/', 'Use a deployment origin without a path');
  assert.ok(!base.username && !base.password && !base.search && !base.hash, 'Use a plain deployment URL');
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname);
  assert.ok(base.protocol === 'https:' || (local && base.protocol === 'http:'), 'HTTPS is required');
  const results = [];
  const headers = {};
  async function get(path, contentType) {
    let url = new URL(path, base);
    assert.equal(url.origin, base.origin, 'Checks must remain on the deployment origin');
    for (let redirects = 0; redirects <= 5; redirects++) {
      const response = await fetchImpl(url, { headers, redirect: 'manual', signal: AbortSignal.timeout(30_000) });
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get('location');
        assert.ok(location, `Missing redirect destination: ${path}`);
        url = new URL(location, url);
        assert.equal(url.origin, base.origin, `Unexpected redirect away from the deployment: ${path}`);
        continue;
      }
      assert.equal(response.status, 200, `${path}: expected HTTP 200, received ${response.status}`);
      assert.match(response.headers.get('content-type') ?? '', contentType, `${path}: unexpected content type`);
      const body = Buffer.from(await response.arrayBuffer());
      assert.ok(body.length > 0, `${path}: empty response`);
      results.push({ path, status: response.status, bytes: body.length });
      return body;
    }
    throw new Error(`Too many redirects: ${path}`);
  }

  const homepage = (await get('/', /text\/html/i)).toString();
  assert.match(homepage, /<main\b/, 'Homepage is missing its main content');
  const script = homepage.match(/<script\b[^>]*\bsrc="([^\"]*\/_next\/static\/[^\"]+)"/i)?.[1];
  assert.ok(script, 'Homepage is missing its JavaScript bundle');
  await get(script.replaceAll('&amp;', '&'), /(?:javascript|ecmascript)/i);

  const sitemap = (await get('/sitemap.xml', /(?:application|text)\/xml/i)).toString();
  assert.match(sitemap, /<urlset\b/, 'Invalid sitemap');
  const articlePath = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => new URL(match[1]).pathname)
    .find((path) => /^\/news\/\d{4}-\d{2}-\d{2}-\d{2}$/.test(path));
  assert.ok(articlePath, 'Sitemap contains no article');
  const article = (await get(articlePath, /text\/html/i)).toString();
  assert.match(article, /<h1\b/, 'Article is missing its title');
  assert.match(article, /<article\b/, 'Article is missing its content');

  const generatedImage = await get('/api/og?title=Deployment%20check', /image\/png/i);
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert.ok(generatedImage.subarray(0, 8).equals(pngSignature), 'Generated image is not a PNG');
  const list = JSON.parse((await get('/api/news?size=1', /application\/json/i)).toString());
  assert.ok(Array.isArray(list.data?.data) && list.data.data.length === 1, 'News API contains no entries');
  const slug = list.data.data[0].slug;
  assert.match(slug, /^\d{4}-\d{2}-\d{2}-\d{2}$/, 'Invalid API article slug');
  const detail = JSON.parse((await get(`/api/news/${slug}`, /application\/json/i)).toString());
  assert.equal(detail.data?.slug, slug, 'News detail does not match the listing');
  assert.ok(detail.data.content.length > 0, 'News detail has no content');
  return results;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const results = await checkDeployment({
      baseUrl: process.env.SMOKE_BASE_URL,
    });
    for (const result of results) console.log(`PASS ${result.path}: HTTP ${result.status}, ${result.bytes} bytes`);
  } catch (error) {
    console.error(`Deployment smoke check failed: ${error.message}`);
    process.exitCode = 1;
  }
}
