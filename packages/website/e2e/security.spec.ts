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
    expect(csp).not.toContain("'unsafe-eval'");
  });

  test('framework assets retain caching and restrictive headers without the document allowlist', async ({
    page,
    request,
  }) => {
    await page.goto('/');
    const script = await page.locator('script[src^="/_next/static/"]').first().getAttribute('src');
    const style = page
      .locator('style[data-href^="/_next/static/"], link[rel="stylesheet"][href^="/_next/static/"]')
      .first();
    const stylesheet = (await style.getAttribute('data-href')) ?? (await style.getAttribute('href'));
    for (const url of [script, stylesheet]) {
      expect(url).not.toBeNull();
      const response = await request.get(url!);
      expect(response.status()).toBe(200);
      const headers = response.headers();
      expect(headers['cache-control']).toContain('immutable');
      expect(headers['x-content-type-options']).toBe('nosniff');
      expect(headers['strict-transport-security']).toContain('max-age=');
      expect(headers['content-security-policy']).toBe("default-src 'none'; frame-ancestors 'none'; sandbox");
    }
  });

  test('hydrates and navigates without violating the production CSP', async ({ page }) => {
    await page.addInitScript(() => {
      const violations: string[] = [];
      Object.defineProperty(window, '__testCspViolations', { value: violations });
      window.addEventListener('securitypolicyviolation', (event) => violations.push(event.violatedDirective));
    });

    await page.goto('/');
    await expect(page.getByRole('button', { name: /モードに切り替え/ })).toBeEnabled();
    // Replay uses the same Blob worker mechanism when its DSN is configured.
    const workerMessage = await page.evaluate(async () => {
      const url = URL.createObjectURL(new Blob(['postMessage("ready")'], { type: 'text/javascript' }));
      let worker: Worker | undefined;
      try {
        return await new Promise<string>((resolve, reject) => {
          worker = new Worker(url);
          worker.onmessage = (event: MessageEvent<string>) => resolve(event.data);
          worker.onerror = () => reject(new Error('Blob worker failed under the production CSP'));
        });
      } finally {
        worker?.terminate();
        URL.revokeObjectURL(url);
      }
    });
    expect(workerMessage).toBe('ready');
    expect(await page.evaluate(() => Reflect.get(window, '__testCspViolations'))).toEqual([]);

    await page.getByRole('contentinfo').getByRole('link', { name: 'お知らせ', exact: true }).click();
    await expect(page).toHaveURL('/news');
    await expect(page.getByRole('heading', { name: 'お知らせ', level: 1 })).toBeVisible();
    expect(await page.evaluate(() => Reflect.get(window, '__testCspViolations'))).toEqual([]);
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
