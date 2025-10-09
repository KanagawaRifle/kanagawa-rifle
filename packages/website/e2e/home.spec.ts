import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');

    // タイトルを確認
    await expect(page).toHaveTitle(/神奈川県ライフル射撃協会/);
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');

    const aboutLink = page.getByRole('link', { name: '協会について' });
    await aboutLink.waitFor({ state: 'visible' });
    await aboutLink.click();
    await page.waitForURL('/about');
    await expect(page).toHaveURL('/about');
  });
});
