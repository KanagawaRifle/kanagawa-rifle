import { expect, test } from '@playwright/test';

for (const [year, count] of [
  [2022, 3],
  [2023, 5],
  [2024, 8],
  [2025, 9],
  [2026, 4],
]) {
  test(`preserves ${year} competition route and entries`, async ({ page }) => {
    const response = await page.goto(`/competitions/${year}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(String(year));
    await expect(page.getByRole('main').getByRole('heading', { level: 2 })).toHaveCount(count!);
  });
}

test('home and year page share the published results URL', async ({ page }) => {
  await page.goto('/');
  const results = page.getByRole('link', { name: '速報', exact: true });
  await expect(results).toBeVisible();
  const href = await results.getAttribute('href');
  expect(href).toContain('2026-06-18-eastern-japan-results.pdf');
  await page.goto('/competitions/2026');
  await expect(page.locator(`a[href="${href}"]`)).toBeVisible();
});

test('unknown fiscal year returns 404', async ({ request }) => {
  expect((await request.get('/competitions/1999')).status()).toBe(404);
});
