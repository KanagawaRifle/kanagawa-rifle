import { expect, test } from '@playwright/test';
import { JSDOM } from 'jsdom';

const botHeaders = { 'user-agent': 'Twitterbot/1.0' };
const publicPaths = [
  '/',
  '/about',
  '/join',
  '/competitions',
  '/competitions/2026',
  '/recommendation',
  '/projects',
  '/forms',
  '/links',
];

test('public pages serve distinct metadata and canonical URLs in the initial HTML', async ({ request }) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of publicPaths) {
    const response = await request.get(`${path}?utm_source=seo-test`, { headers: botHeaders });
    expect(response.status()).toBe(200);
    const document = new JSDOM(await response.text()).window.document;
    const canonical = document.head.querySelector('link[rel="canonical"]')?.getAttribute('href');
    expect(new URL(canonical!).pathname).toBe(path);
    expect(new URL(canonical!).search).toBe('');
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelectorAll('main h1')).toHaveLength(1);
    expect(document.documentElement.lang).toBe('ja');
    const description = document.head.querySelector('meta[name="description"]')?.getAttribute('content');
    expect(description).toBeTruthy();
    expect(document.head.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe(description);
    expect(document.head.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(canonical);
    expect(document.head.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(document.title);
    expect(document.head.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('ja_JP');
    expect(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe(
      'summary_large_image',
    );
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).not.toContain('noindex');
    expect(response.headers()['x-robots-tag']).toBeUndefined();
    titles.add(document.title);
    descriptions.add(description!);
    const structured = [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) =>
      JSON.parse(node.textContent!),
    );
    const organization = structured.find((data) => data['@type'] === 'SportsOrganization');
    const website = structured.find((data) => data['@type'] === 'WebSite');
    expect(website.publisher['@id']).toBe(organization['@id']);
    if (path !== '/') {
      const breadcrumb = structured.find((data) => data['@type'] === 'BreadcrumbList');
      expect(breadcrumb.itemListElement.at(-1).item).toBe(canonical);
    }
  }
  expect(titles.size).toBe(publicPaths.length);
  expect(descriptions.size).toBe(publicPaths.length);
});

test('pagination preserves distinct canonical pages and excludes alternate page sizes', async ({ request }) => {
  for (const [path, canonicalPath, noindex] of [
    ['/news', '/news', false],
    ['/news?page=1&size=12&utm_source=test', '/news', false],
    ['/news?page=2&size=12', '/news?page=2', false],
    ['/news?page=2&size=6', '/news?page=2&size=6', true],
  ] as const) {
    const response = await request.get(path, { headers: botHeaders });
    expect(response.status()).toBe(200);
    const document = new JSDOM(await response.text()).window.document;
    const url = new URL(document.head.querySelector('link[rel="canonical"]')!.getAttribute('href')!);
    expect(`${url.pathname}${url.search}`).toBe(canonicalPath);
    const robots = document.head.querySelector('meta[name="robots"]')!.getAttribute('content')!;
    expect(robots.includes('noindex')).toBe(noindex);
    expect(robots).toContain('follow');
    expect(document.querySelector('nav[aria-label="ページネーション"] a[aria-label="次のページ"]')).not.toBeNull();
    if (canonicalPath.includes('page=2')) expect(document.title).toContain('2ページ目');
  }
});

test('articles expose matching dates, publisher identity, and crawlable social images', async ({ request }) => {
  const path = '/news/2026-09-24-01';
  const response = await request.get(path, { headers: botHeaders });
  const document = new JSDOM(await response.text()).window.document;
  const meta = (property: string) =>
    document.head.querySelector(`meta[property="${property}"]`)?.getAttribute('content');
  expect(meta('og:type')).toBe('article');
  expect(meta('og:image:width')).toBe('1200');
  expect(meta('og:image:height')).toBe('630');
  const structured = [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) =>
    JSON.parse(node.textContent!),
  );
  const article = structured.find((data) => data['@type'] === 'Article');
  expect(article.url).toBe(meta('og:url'));
  expect(article.datePublished).toBe(meta('article:published_time'));
  expect(article.dateModified).toBe(meta('article:modified_time'));
  expect(article.description).toBe(meta('og:description'));
  expect(article.publisher['@id']).toBe(structured.find((data) => data['@type'] === 'SportsOrganization')['@id']);
  const image = new URL(meta('og:image')!);
  const imageResponse = await request.get(`${image.pathname}${image.search}`);
  expect(imageResponse.status()).toBe(200);
  expect(imageResponse.headers()['content-type']).toContain('image/png');
  const body = await imageResponse.body();
  expect(body.readUInt32BE(16)).toBe(1200);
  expect(body.readUInt32BE(20)).toBe(630);
});

test('robots and sitemap agree, JSON APIs and missing pages are not indexable', async ({ request }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  const robotsText = await robots.text();
  expect(robotsText).toContain('Allow: /');
  const sitemapUrl = robotsText.match(/Sitemap: (.+)/)?.[1];
  expect(new URL(sitemapUrl!).pathname).toBe('/sitemap.xml');
  const response = await request.get('/sitemap.xml');
  const document = new JSDOM(await response.text(), { contentType: 'text/xml' }).window.document;
  const urls = [...document.querySelectorAll('loc')].map((node) => node.textContent!);
  expect(new Set(urls).size).toBe(urls.length);
  expect(urls).toContain(new URL('/news?page=2', sitemapUrl).toString());
  expect(urls.some((url) => url.includes('size=') || url.includes('/api/'))).toBe(false);
  for (const path of ['/api/news', '/api/news/2026-09-24-01']) {
    expect((await request.get(path)).headers()['x-robots-tag']).toBe('noindex');
  }
  for (const path of ['/news?page=99999', '/news?size=0', '/news/missing', '/competitions/9999']) {
    const response = await request.get(path, { headers: botHeaders });
    expect(response.status()).toBe(404);
    const document = new JSDOM(await response.text()).window.document;
    expect(
      [...document.querySelectorAll('meta[name="robots"]')].some((node) =>
        node.getAttribute('content')?.includes('noindex'),
      ),
    ).toBe(true);
  }
});
