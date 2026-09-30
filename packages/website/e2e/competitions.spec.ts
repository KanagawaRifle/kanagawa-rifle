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

test('home publishes the autumn open notice and shares its links with competition pages', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('【重要】令和8年度のお知らせ', { exact: true })).toHaveCount(0);
  await expect(page.getByText('東日本ライフル射撃競技選手権大会', { exact: true })).toHaveCount(0);
  const notice = page.getByRole('alert').filter({ hasText: '第7回秋季神奈川オープン（県選手権大会）' });
  await expect(notice).toBeVisible();
  await expect(notice).toContainText('11月29日(日)');
  const links = [
    { name: '申込', href: 'https://forms.gle/n8tbVCZAfUqZUsxz6' },
    {
      name: '要項',
      href: 'https://static.kanagawa-rifle.org/website/competitions/2026/2026-11-29-autumn-kanagawa-open-championship-details.pdf',
    },
  ];
  for (const { name, href } of links) {
    await expect(notice.getByRole('link', { name, exact: true })).toHaveAttribute('href', href);
  }
  for (const path of ['/competitions', '/competitions/2026']) {
    await page.goto(path);
    for (const { href } of links) {
      await expect(page.locator(`a[href="${href}"]`)).toBeVisible();
    }
  }
});

test('unknown fiscal year returns 404', async ({ request }) => {
  expect((await request.get('/competitions/1999')).status()).toBe(404);
});

test('year navigation identifies the selected archive and preserves entry help', async ({ page }) => {
  await page.goto('/competitions');
  await page.getByRole('button', { name: '申込フォームの説明' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: '閉じる', exact: true }).click();
  const navigation = page.getByRole('navigation', { name: '大会年度' });
  await navigation.getByRole('link', { name: '2025', exact: true }).click();
  await expect(page).toHaveURL('/competitions/2025');
  await expect(navigation.getByRole('link', { name: '2025', exact: true })).toHaveAttribute('aria-current', 'page');
});
