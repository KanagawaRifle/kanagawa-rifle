import { expect, test } from '@playwright/test';

for (const path of ['/', '/news', '/competitions']) {
  test(`${path} hydrates without development diagnostics`, async ({ page }) => {
    const diagnostics: string[] = [];
    page.on('pageerror', (error) => diagnostics.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error' || message.type() === 'warning') diagnostics.push(message.text());
    });

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-security-policy']).toContain("'unsafe-eval'");

    const social = page.getByRole('navigation', { name: 'ソーシャルメディア' });
    await expect(social.getByRole('link')).toHaveCount(3);
    const facebook = social.getByRole('link', { name: 'Facebook', exact: true });
    await facebook.scrollIntoViewIfNeeded();
    await facebook.focus();
    await expect(page.getByRole('tooltip', { name: 'Facebook', exact: true })).toBeVisible();

    if (path === '/') {
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^http:\/\/127\.0\.0\.1:3200\/?$/);
      const poster = page.getByRole('img', { name: '国スポ予選ポスター' });
      await expect(poster).toBeVisible();
      await expect.poll(() => poster.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    }

    if (path === '/competitions') {
      await page.getByRole('button', { name: '申込フォームの説明' }).click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.getByRole('button', { name: '閉じる', exact: true }).click();
      await expect(page.getByRole('dialog')).not.toBeVisible();
      await page.getByRole('navigation', { name: '大会年度' }).getByRole('link', { name: '2025', exact: true }).click();
      await expect(page).toHaveURL('/competitions/2025');
      await expect(page.getByRole('heading', { level: 1 })).toContainText('2025');
    }

    expect(diagnostics).toEqual([]);
  });
}
