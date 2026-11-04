import { expect, test } from '@playwright/test';
import { JSDOM } from 'jsdom';

const botHeaders = { 'user-agent': 'Twitterbot/1.0' };
const publicPaths = [
  '/',
  '/about',
  '/join',
  '/competitions',
  '/competitions/2022',
  '/competitions/2023',
  '/competitions/2024',
  '/competitions/2025',
  '/competitions/2026',
  '/recommendation',
  '/projects',
  '/forms',
  '/links',
];

test.describe('styled error fallbacks without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('404 retains its styles and its link back to the home page', async ({ page }) => {
    const response = await page.goto('/missing-page-for-style-check');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('banner')).toHaveCSS('height', '48px');
    const home = page.getByRole('link', { name: 'ホームへ', exact: true });
    await expect(home).toHaveCSS('height', '40px');
    await home.click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('神奈川県');
  });
});

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
    const webPage = structured.find((data) => ['WebPage', 'AboutPage', 'CollectionPage'].includes(data['@type']));
    expect(structured.filter((data) => data['@type'] === 'SportsOrganization')).toHaveLength(1);
    expect(website.publisher['@id']).toBe(organization['@id']);
    expect(webPage['@id']).toBe(new URL(canonical!).toString());
    expect(webPage.url).toBe(new URL(canonical!).toString());
    expect(webPage.isPartOf['@id']).toBe(website['@id']);
    expect(webPage.publisher['@id']).toBe(organization['@id']);
    expect(webPage.name).toBe(document.querySelector('main h1')?.textContent);
    expect(webPage.description).toBe(description);
    expect(document.head.querySelector('link[type="application/atom+xml"]')?.getAttribute('href')).toBe(
      new URL('/feed.xml', canonical).toString(),
    );
    expect(organization.sameAs).toContain('https://www.facebook.com/KanagawaRifle');
    if (path === '/about') {
      expect(webPage['@type']).toBe('AboutPage');
      expect(webPage.mainEntity['@id']).toBe(organization['@id']);
      expect(document.querySelector(`a[href="tel:${organization.telephone}"]`)).not.toBeNull();
      expect(document.querySelector(`a[href="mailto:${organization.email}"]`)).not.toBeNull();
      expect(document.querySelector('main')?.textContent).toContain(organization.address.postalCode);
    }
    if (path !== '/') {
      const breadcrumb = structured.find((data) => data['@type'] === 'BreadcrumbList');
      expect(breadcrumb.itemListElement.at(-1).item).toBe(canonical);
      expect(webPage.breadcrumb['@id']).toBe(breadcrumb['@id']);
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
    const structured = [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) =>
      JSON.parse(node.textContent!),
    );
    const breadcrumb = structured.find((data) => data['@type'] === 'BreadcrumbList');
    expect(breadcrumb.itemListElement.at(-1).item).toBe(url.toString());
    const collection = structured.find((data) => data['@type'] === 'CollectionPage');
    expect(collection['@id']).toBe(url.toString());
    expect(collection.description).toBe(
      document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
    );
    const articles = [...document.querySelectorAll('ul[aria-label="お知らせ一覧"] > li a')];
    expect(collection.mainEntity.numberOfItems).toBe(articles.length);
    expect(collection.mainEntity.itemListElement.map(({ item }: { item: { url: string } }) => item.url)).toEqual(
      articles.map((link) => new URL(link.getAttribute('href')!, url).toString()),
    );
  }
});

test('pagination metadata matches crawlable adjacent links, including the first and last page', async ({ request }) => {
  const response = await request.get('/api/news');
  const { data } = await response.json();
  const lastPage = data.pagination.totalPages;
  for (const [path, previous, next] of [
    ['/news', undefined, '/news?page=2'],
    ['/news?page=2', '/news', '/news?page=3'],
    ['/news?page=2&size=6', '/news?size=6', '/news?page=3&size=6'],
    [`/news?page=${lastPage}`, `/news?page=${lastPage - 1}`, undefined],
  ] as const) {
    const result = await request.get(path, { headers: botHeaders });
    expect(result.status()).toBe(200);
    const document = new JSDOM(await result.text()).window.document;
    for (const [relation, expected] of [
      ['prev', previous],
      ['next', next],
    ] as const) {
      const href = document.head.querySelector(`link[rel="${relation}"]`)?.getAttribute('href');
      if (expected) {
        const url = new URL(href!);
        expect(`${url.pathname}${url.search}`).toBe(expected);
        expect(
          [...document.querySelectorAll('nav[aria-label="ページネーション"] a')].some(
            (link) => link.getAttribute('href') === expected,
          ),
        ).toBe(true);
      } else expect(href).toBeUndefined();
    }
  }
});

test('the update feed describes the same recent articles, canonical URLs and dates as the site', async ({
  request,
}) => {
  const response = await request.get('/feed.xml');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/atom+xml');
  expect(response.headers()['x-robots-tag']).toBe('noindex');
  const document = new JSDOM(await response.text(), { contentType: 'application/xml' }).window.document;
  expect(document.documentElement.namespaceURI).toBe('http://www.w3.org/2005/Atom');
  const { data: news } = await (await request.get('/api/news?size=20')).json();
  const entries = [...document.querySelectorAll('entry')];
  expect(entries).toHaveLength(news.data.length);
  for (const [index, entry] of entries.entries()) {
    const article = news.data[index];
    expect(new URL(entry.querySelector('id')!.textContent!).pathname).toBe(`/news/${article.slug}`);
    expect(entry.querySelector('link')?.getAttribute('href')).toBe(entry.querySelector('id')?.textContent);
    expect(entry.querySelector('title')?.textContent).toBe(article.title);
    expect(entry.querySelector('published')?.textContent).toBe(article.published);
    expect(entry.querySelector('updated')?.textContent).toBe(article.updated ?? article.published);
    expect(entry.querySelector('summary')?.textContent).toBeTruthy();
  }
});

test('historical articles with the same headline have distinguishable search titles', async ({ request }) => {
  const titles = new Set<string>();
  const headlines = new Set<string>();
  for (const slug of ['2020-08-06-01', '2020-08-15-01']) {
    const { data: article } = await (await request.get(`/api/news/${slug}`)).json();
    const response = await request.get(`/news/${slug}`, { headers: botHeaders });
    expect(response.status()).toBe(200);
    const document = new JSDOM(await response.text()).window.document;
    expect(document.querySelector('main h1')?.textContent).toBe(article.title);
    const published = new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Tokyo',
    }).format(new Date(article.published));
    expect(document.title).toContain(`${article.title}（${published}）`);
    expect(document.head.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(document.title);
    headlines.add(article.title);
    titles.add(document.title);
    const navigation = document.querySelector('nav[aria-label="前後のお知らせ"]');
    expect(navigation?.querySelectorAll('a')).toHaveLength(2);
    for (const link of navigation!.querySelectorAll('a')) {
      expect((await request.get(link.getAttribute('href')!)).status()).toBe(200);
    }
  }
  expect(headlines.size).toBe(1);
  expect(titles.size).toBe(2);
});

test('contextual links and numbered archive navigation work without JavaScript and fit the viewport', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3100/join');
  const guide = page.getByRole('navigation', { name: '関連するご案内' });
  await guide.getByRole('link', { name: '申請書・各種様式' }).click();
  await expect(page).toHaveURL(/\/forms$/);
  await expect(page.getByRole('heading', { name: '申請書・各種様式', level: 1 })).toBeVisible();
  await page.goto('http://127.0.0.1:3100/news?page=2');
  await page
    .getByRole('navigation', { name: 'ページネーション' })
    .first()
    .getByRole('link', { name: '3ページ目', exact: true })
    .click();
  await expect(page).toHaveURL(/\/news\?page=3$/);
  await expect(page.locator('nav[aria-label="ページネーション"]').first().locator('[aria-current="page"]')).toHaveText(
    '3',
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await context.close();
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
  const webPage = structured.find((data) => data['@type'] === 'WebPage');
  expect(webPage.mainEntity['@id']).toBe(article['@id']);
  expect(article.mainEntityOfPage['@id']).toBe(webPage['@id']);
  expect(article.url).toBe(meta('og:url'));
  expect(article.datePublished).toBe(meta('article:published_time'));
  expect(article.dateModified).toBe(meta('article:modified_time'));
  expect(article.description).toBe(meta('og:description'));
  expect(article.publisher['@id']).toBe(structured.find((data) => data['@type'] === 'SportsOrganization')['@id']);
  expect(document.querySelector('article a[href="/about"]')?.textContent).toBe(article.author.name);
  const image = new URL(meta('og:image')!);
  const imageResponse = await request.get(`${image.pathname}${image.search}`);
  expect(imageResponse.status()).toBe(200);
  expect(imageResponse.headers()['content-type']).toContain('image/png');
  const body = await imageResponse.body();
  expect(body.readUInt32BE(16)).toBe(1200);
  expect(body.readUInt32BE(20)).toBe(630);
});

test('legacy Markdown headings keep one page title and working table of contents', async ({ request }) => {
  const response = await request.get('/news/2025-10-09-01', { headers: botHeaders });
  expect(response.status()).toBe(200);
  const document = new JSDOM(await response.text()).window.document;
  expect(document.querySelectorAll('main h1')).toHaveLength(1);
  expect(document.querySelector('article h1')).toBeNull();
  const links = [...document.querySelectorAll('nav[aria-label="記事の目次"] a')];
  expect(links.length).toBeGreaterThan(0);
  for (const link of links) {
    const heading = document.getElementById(link.getAttribute('href')!.slice(1));
    expect(heading).not.toBeNull();
    expect(heading!.textContent).toBe(link.textContent);
  }
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
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(
      [...document.querySelectorAll('meta[name="robots"]')].some((node) =>
        node.getAttribute('content')?.includes('noindex'),
      ),
    ).toBe(true);
  }
});

test('www redirects permanently to the canonical host while preserving paths and pagination', async ({ request }) => {
  for (const path of ['/', '/news?page=2', '/news/2026-09-24-01']) {
    const response = await request.get(path, {
      headers: { host: 'www.kanagawa-rifle.org' },
      maxRedirects: 0,
    });
    expect(response.status()).toBe(308);
    expect(new URL(response.headers().location!).toString()).toBe(
      new URL(path, 'https://kanagawa-rifle.org').toString(),
    );
  }
});

test('archived project documents use the published migration asset URLs', async ({ request }) => {
  const response = await request.get('/projects');
  expect(response.status()).toBe(200);
  const document = new JSDOM(await response.text()).window.document;
  for (const filename of ['R03yotei0420.xls', 'R03yoteiura.doc', 'R03oshirase.doc', 'R03kaihi.doc']) {
    const link = document.querySelector(`main a[href$="/migration/${filename}"]`);
    expect(link).not.toBeNull();
    expect(link!.getAttribute('href')).toMatch(/^https?:\/\//);
  }
});
