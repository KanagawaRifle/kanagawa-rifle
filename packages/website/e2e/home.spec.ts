import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
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
