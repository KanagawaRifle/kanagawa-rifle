import { expect, test } from '@playwright/test';

const protectedRequests: { path: string; headers?: Record<string, string> }[] = [
  { path: '/' },
  { path: '/about', headers: { purpose: 'prefetch' } },
  { path: '/news?_rsc=test', headers: { 'next-router-prefetch': '1', rsc: '1' } },
  { path: '/api/news' },
  { path: '/api/news/2026-10-15-01' },
  { path: '/api/og' },
  { path: '/sitemap.xml' },
  { path: '/robots.txt' },
  { path: '/feed.xml' },
  { path: '/opengraph-image.png' },
  { path: '/_next/static/chunks/app.js' },
  { path: '/_next/image?url=/opengraph-image.png&w=640&q=75' },
];

for (const { path, headers } of protectedRequests) {
  test(`requires authentication for ${path}`, async ({ baseURL }) => {
    // Use native fetch so the context's configured credentials are not sent.
    const response = await fetch(new URL(path, baseURL), { headers });
    expect(response.status).toBe(401);
    expect(response.headers.get('www-authenticate')).toBe('Basic realm="Secure Area"');
    await response.arrayBuffer();
  });
}

test('serves authenticated pages, APIs, and original images', async ({ request }) => {
  for (const path of ['/about', '/api/news', '/opengraph-image.png']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
  const optimizer = await request.get('/_next/image?url=/opengraph-image.png&w=640&q=75');
  expect(optimizer.status()).toBe(404);
});

test('loads protected assets and supports browser navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('main')).toBeVisible();
  await page.getByRole('contentinfo').getByRole('link', { name: 'お知らせ', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'お知らせ', exact: true, level: 1 })).toBeVisible();
  const imageWidth = await page.evaluate(
    () =>
      new Promise<number>((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image.naturalWidth);
        image.onerror = () => resolve(0);
        image.src = '/opengraph-image.png';
      }),
  );
  expect(imageWidth).toBeGreaterThan(0);
});
