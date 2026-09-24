import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('membership fee tables remain readable and keyboard accessible at every viewport', async ({ page }) => {
  await page.goto('/join');
  await expect(page.getByRole('heading', { level: 1, name: '入会案内' })).toBeVisible();
  const table = page.getByRole('table', { name: '一般の方の会費' });
  await expect(table.getByRole('cell', { name: '30,000円', exact: true })).toBeVisible();
  await expect(table.getByRole('columnheader', { name: /^移籍/ })).toHaveAttribute('scope', 'col');
  const region = page.getByRole('region', { name: '一般の方の会費' });
  await region.focus();
  await expect(region).toBeFocused();
  if (await region.evaluate((element) => element.scrollWidth > element.clientWidth)) {
    await region.press('ArrowRight');
    await expect.poll(() => region.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  }
  await expect(page.getByRole('table')).toHaveCount(6);
  const fitsViewport = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  expect(fitsViewport).toBe(true);
});

for (const path of ['/join', '/recommendation']) {
  test(`${path} retains accessible content after extracting feature components`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(path);
    await expect(page.getByRole('navigation', { name: 'パンくずリスト' })).toHaveCount(1);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(result.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}
