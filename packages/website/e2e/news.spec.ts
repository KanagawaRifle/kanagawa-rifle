// packages/website/e2e/news.spec.ts

import { test, expect } from '@playwright/test';

test.describe('News List Page', () => {
  test('displays news list with correct structure', async ({ page }) => {
    await page.goto('/news');

    // ページタイトルを確認
    await expect(page).toHaveTitle(/お知らせ.*神奈川県ライフル射撃協会/);

    // ニュース一覧が表示されることを確認
    const newsList = page.getByRole('list');
    await newsList.waitFor({ state: 'visible' });

    // 少なくとも1つのニュース項目があることを確認
    const newsItems = page.getByRole('listitem');
    await expect(newsItems.first()).toBeVisible();
  });

  test('news items have accessible labels', async ({ page }) => {
    await page.goto('/news');

    // リンクがアクセシブルなラベルを持っていることを確認
    const newsLinks = page.getByRole('link', { name: /公開$/ });
    const count = await newsLinks.count();

    // 少なくとも1つのニュースリンクがあることを確認
    expect(count).toBeGreaterThan(0);
  });

  test('pagination works correctly', async ({ page }) => {
    await page.goto('/news');

    // ページネーションが存在する場合のテスト
    const pagination = page.getByRole('navigation', { name: /ページネーション/i });
    const hasPagination = (await pagination.count()) > 0;

    if (hasPagination) {
      // 次のページへのリンクをクリック
      const nextButton = page.getByRole('button', { name: /次/i });
      if ((await nextButton.count()) > 0 && (await nextButton.isEnabled())) {
        await nextButton.click();
        await page.waitForURL(/page=2/);
        await expect(page).toHaveURL(/page=2/);
      }
    }
  });

  test('clicking news item navigates to detail page', async ({ page }) => {
    await page.goto('/news');

    // 最初のニュース項目をクリック
    const firstNewsLink = page.getByRole('link', { name: /公開$/ }).first();
    await firstNewsLink.waitFor({ state: 'visible' });

    const href = await firstNewsLink.getAttribute('href');
    await firstNewsLink.click();

    // 詳細ページに遷移したことを確認
    await page.waitForURL(/\/news\/\d{4}-\d{2}-\d{2}-\d{2}/);
    expect(href).toMatch(/\/news\/\d{4}-\d{2}-\d{2}-\d{2}/);
  });
});

test.describe('News Detail Page', () => {
  test('displays article content correctly', async ({ page }) => {
    // まずニュース一覧から最初の記事を取得
    await page.goto('/news');

    const firstNewsLink = page.getByRole('link', { name: /公開$/ }).first();
    await firstNewsLink.waitFor({ state: 'visible' });

    const href = await firstNewsLink.getAttribute('href');
    if (!href) {
      test.skip();
      return;
    }

    await page.goto(href);

    // 記事タイトルが表示されることを確認
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    // 公開日が表示されることを確認
    const dateElement = page.locator('time');
    await expect(dateElement).toBeVisible();
  });

  test('has breadcrumb navigation', async ({ page }) => {
    await page.goto('/news');

    const firstNewsLink = page.getByRole('link', { name: /公開$/ }).first();
    await firstNewsLink.waitFor({ state: 'visible' });

    const href = await firstNewsLink.getAttribute('href');
    if (!href) {
      test.skip();
      return;
    }

    await page.goto(href);

    // パンくずリストが存在することを確認
    const breadcrumb = page.getByRole('navigation', { name: /パンくず/i });
    const hasBreadcrumb = (await breadcrumb.count()) > 0;

    if (hasBreadcrumb) {
      // ホームへのリンクがあることを確認
      const homeLink = breadcrumb.getByRole('link', { name: /ホーム|トップ/i });
      await expect(homeLink).toBeVisible();

      // お知らせ一覧へのリンクがあることを確認
      const newsListLink = breadcrumb.getByRole('link', { name: /お知らせ/i });
      await expect(newsListLink).toBeVisible();
    }
  });

  test('returns 404 for invalid slug', async ({ page }) => {
    const response = await page.goto('/news/invalid-slug-format');

    // 404ページが返されることを確認
    expect(response?.status()).toBe(404);
  });

  test('handles non-existent article gracefully', async ({ page }) => {
    const response = await page.goto('/news/9999-12-31-99');

    // 存在しない記事は404を返す
    expect(response?.status()).toBe(404);
  });
});

test.describe('News Page Accessibility', () => {
  test('news list has proper heading structure', async ({ page }) => {
    await page.goto('/news');

    // h1が1つだけ存在することを確認
    const h1Elements = page.getByRole('heading', { level: 1 });
    await expect(h1Elements).toHaveCount(1);
  });

  test('news list images have alt text or are decorative', async ({ page }) => {
    await page.goto('/news');

    // aria-hidden="true"が設定されている画像/アイコンを確認
    const images = page.locator('img:not([aria-hidden="true"])');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');

      // altが設定されているか、role="presentation"であることを確認
      expect(alt !== null || role === 'presentation').toBeTruthy();
    }
  });

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/news');

    // Tabキーでニュースリンクにフォーカスできることを確認
    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // フォーカスされた要素がクリック可能であることを確認
    const tagName = await focusedElement.evaluate((el) => el.tagName.toLowerCase());
    expect(['a', 'button']).toContain(tagName);
  });
});
