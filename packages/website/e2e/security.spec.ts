// packages/website/e2e/security.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Security Headers', () => {
  test('should include security headers on pages', async ({ request }) => {
    const response = await request.get('/');
    const headers = response.headers();

    // HSTS (Strict-Transport-Security)
    expect(headers['strict-transport-security']).toContain('max-age=');
    expect(headers['strict-transport-security']).toContain('includeSubDomains');

    // X-Content-Type-Options
    expect(headers['x-content-type-options']).toBe('nosniff');

    // X-Frame-Options
    expect(headers['x-frame-options']).toBe('DENY');

    // Referrer-Policy
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');

    // Permissions-Policy
    expect(headers['permissions-policy']).toContain('camera=()');
  });

  test('should include CSP header', async ({ request }) => {
    const response = await request.get('/');
    const headers = response.headers();

    const csp = headers['content-security-policy'];
    expect(csp).toBeDefined();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain('frame-ancestors');
  });

  test('API routes should include cache headers', async ({ request }) => {
    const response = await request.get('/api/news');
    const headers = response.headers();

    expect(headers['cache-control']).toContain('max-age=');
    expect(headers['cache-control']).toContain('stale-while-revalidate');
  });
});

test.describe('Skip Link', () => {
  test('skip link should be visible on focus and navigate to main content', async ({ page }) => {
    await page.goto('/');

    // Tab キーでスキップリンクにフォーカス
    await page.keyboard.press('Tab');

    // スキップリンクが表示されることを確認
    const skipLink = page.getByRole('link', { name: 'メインコンテンツへスキップ' });
    await expect(skipLink).toBeVisible();

    // スキップリンクをクリック
    await skipLink.click();

    // メインコンテンツにフォーカスが移動することを確認
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });
});
