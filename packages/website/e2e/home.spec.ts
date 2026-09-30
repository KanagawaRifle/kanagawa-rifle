import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test('entry guidance exposes the main tasks without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3100/');
    const navigation = page.getByRole('navigation', { name: '入会・大会参加のご案内' });
    for (const path of ['/join', '/competitions', '/forms']) {
      await expect(navigation.locator(`a[href="${path}"]`)).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await context.close();
  });

  test('has title', async ({ page }) => {
    await page.goto('/');

    // タイトルを確認
    await expect(page).toHaveTitle(/神奈川県ライフル射撃協会/);
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');

    const aboutLink = page.getByRole('contentinfo').getByRole('link', { name: '協会について', exact: true });
    await aboutLink.waitFor({ state: 'visible' });
    await aboutLink.click();
    await page.waitForURL('/about');
    await expect(page).toHaveURL('/about');
  });
});
