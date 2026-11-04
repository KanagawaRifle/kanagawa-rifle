import { expect, test } from '@playwright/test';

const articlePath = '/news/2026-09-24-01';

// HTTP 応答と初期 HTML は JavaScript に依存せず検証する。
test('article HTML contains content, metadata, and structured data', async ({ request }) => {
  const articleResponse = await request.get(`/api${articlePath}`);
  expect(articleResponse.status()).toBe(200);
  const { data: article } = await articleResponse.json();
  const response = await request.get(articlePath);
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain(article.title);
  expect(html).toContain('<article>');
  expect(html).toContain('application/ld+json');
  expect(html).toContain('"datePublished":"' + article.published + '"');
  expect(html).toContain('property="og:title"');
  expect(html).toContain('yokosuka.kanagawa-rifle.org/#closure-notice-title');
});

test('news is readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:3100${articlePath}`);
  await expect(page.getByRole('article')).toBeVisible();
  await expect(page.locator('article .prose')).toHaveCSS('font-size', '18px');
  await expect(page.locator('article .prose')).toHaveCSS('max-width', 'none');
  await expect(page.getByRole('article').getByRole('link', { name: '一覧に戻る' })).toBeVisible();
  expect(await page.getByRole('article').innerText()).toContain('休場期間：2026年9月25日');
  await context.close();
});

test('home displays six latest news items', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('list', { name: 'お知らせ一覧' }).getByRole('listitem')).toHaveCount(6);
});

test('pagination, size changes, direct URLs and browser back work', async ({ page }) => {
  await page.goto('/news?size=6');
  const news = page.getByRole('list', { name: 'お知らせ一覧' });
  await expect(news.getByRole('listitem')).toHaveCount(6);
  const firstHref = await news.getByRole('link').first().getAttribute('href');
  await page
    .getByRole('navigation', { name: 'ページネーション' })
    .first()
    .getByRole('link', { name: '次のページ', exact: true })
    .click();
  await expect(page).toHaveURL(/page=2&size=6/);
  await expect(news.getByRole('link').first()).not.toHaveAttribute('href', firstHref!);
  await page.goBack();
  await expect(news.getByRole('link').first()).toHaveAttribute('href', firstHref!);
  await page.getByRole('combobox', { name: '表示件数' }).click();
  await page.getByRole('option', { name: '12件', exact: true }).click();
  await expect(page).toHaveURL('/news');
  await expect(news.getByRole('listitem')).toHaveCount(12);
  await page.reload();
  await expect(news.getByRole('listitem')).toHaveCount(12);
});

test('article navigation, breadcrumbs, and share menu work', async ({ page }) => {
  await page.goto('/news');
  await page.getByRole('list', { name: 'お知らせ一覧' }).getByRole('link').first().click();
  await expect(page).toHaveURL(/\/news\/\d{4}-\d{2}-\d{2}-\d{2}$/);
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  await expect(page.getByRole('article').locator('time').first()).toBeVisible();
  await expect(page.locator('article .prose')).toHaveCSS('font-size', '18px');
  await expect(page.locator('article .prose')).toHaveCSS('max-width', 'none');
  await expect(
    page.getByRole('navigation', { name: 'パンくずリスト' }).getByRole('link', { name: 'お知らせ', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: '共有メニューを開く' }).click();
  await expect(page.getByRole('menuitem', { name: 'リンクをコピー' })).toBeVisible();
});

test('copying an article link displays its confirmation toast', async ({ page, context, browserName }) => {
  if (browserName === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(articlePath);
  await page.getByRole('button', { name: '共有メニューを開く' }).click();
  await page.getByRole('menuitem', { name: 'リンクをコピー' }).click();
  await expect(page.getByText('リンクをクリップボードにコピーしました', { exact: true })).toBeVisible();
});

for (const path of [
  '/news/invalid-slug-format',
  '/news/9999-12-31-99',
  '/news?page=0',
  '/news?size=129',
  '/news?page=9999',
  '/news?page=1&page=2',
]) {
  test(`${path} returns HTTP 404`, async ({ request }) => {
    expect((await request.get(path)).status()).toBe(404);
  });
}

test('API retains invalid/missing article distinctions and pagination limits', async ({ request }) => {
  expect((await request.get('/api/news/invalid')).status()).toBe(400);
  expect((await request.get('/api/news/9999-12-31-99')).status()).toBe(404);
  expect((await request.get('/api/news?size=129')).status()).toBe(400);
  const response = await request.get('/api/news?size=128');
  expect(response.status()).toBe(200);
  const { data } = await response.json();
  expect(data.data).toHaveLength(128);
  expect(data.pagination.total).toBeGreaterThan(128);
  expect(data.data.every((article: { content: string }) => article.content === '')).toBe(true);
});

test('sitemap contains every article and its real modification date', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);
  const sitemap = await response.text();
  let page = 1;
  let hasNext = true;
  while (hasNext) {
    const response = await request.get(`/api/news?page=${page}&size=128`);
    expect(response.status()).toBe(200);
    const { data } = await response.json();
    for (const article of data.data) {
      expect(sitemap).toContain(`/news/${article.slug}</loc>`);
      expect(sitemap).toContain(`<lastmod>${article.updated ?? article.published}</lastmod>`);
    }
    hasNext = data.pagination.hasNext;
    page++;
  }
});

test('table of contents anchors match rendered headings', async ({ page }) => {
  await page.goto('/news/2026-01-11-03');
  const links = page.getByRole('article').getByRole('navigation').getByRole('link');
  expect(await links.count()).toBeGreaterThan(0);
  for (const link of await links.all()) {
    const href = await link.getAttribute('href');
    expect(href).toMatch(/^#/);
    await expect(page.locator(`[id="${href!.slice(1)}"]`)).toHaveCount(1);
  }
  await links.first().click();
  await expect(page).toHaveURL(/#/);
});

test('theme control hydrates and switches theme', async ({ page }) => {
  await page.goto('/news');
  const toggle = page.getByRole('button', { name: /モードに切り替え/ });
  await expect(toggle).toBeEnabled();
  const before = await page.locator('html').getAttribute('class');
  await toggle.click();
  await expect(page.locator('html')).not.toHaveAttribute('class', before!);
});
