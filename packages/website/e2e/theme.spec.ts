import { expect, test } from '@playwright/test';

test('the saved theme is available before framework JavaScript loads', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.route('**/_next/static/**/*.js', (route) => route.abort());
  await page.goto('/about');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('button', { name: 'ライトモードに切り替え' })).toBeVisible();
});

test('system changes and settings from other tabs update the theme', async ({ page, context }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveClass(/light/);

  const otherTab = await context.newPage();
  await otherTab.goto('/forms', { waitUntil: 'networkidle' });
  await otherTab.evaluate(() => localStorage.setItem('theme', 'dark'));
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveClass(/dark/);
  await otherTab.evaluate(() => localStorage.removeItem('theme'));
  await expect(page.locator('html')).toHaveClass(/light/);
  await otherTab.close();
});

test('theme selection works when local storage is blocked', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.addInitScript(() => {
    for (const method of ['getItem', 'setItem']) {
      Object.defineProperty(Storage.prototype, method, {
        value() {
          throw new DOMException('Storage is blocked', 'SecurityError');
        },
      });
    }
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('button', { name: 'ライトモードに切り替え' }).click();
  await expect(page.locator('html')).toHaveClass(/light/);
  await page.emulateMedia({ colorScheme: 'light' });
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveClass(/light/);
});
