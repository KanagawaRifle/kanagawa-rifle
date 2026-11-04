import { expect, test } from '@playwright/test';

test('mobile navigation loads on demand, restores focus and closes after navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });
  const trigger = page.getByRole('button', { name: 'メニューを開く', exact: true });
  const initialBox = await trigger.boundingBox();
  let resumeDownloads!: () => void;
  const downloads = new Promise<void>((resolve) => {
    resumeDownloads = resolve;
  });
  await page.route('**/_next/static/chunks/*.js', async (route) => {
    await downloads;
    await route.continue();
  });
  try {
    await trigger.focus();
    await page.keyboard.press('Enter');
    // Blocking new chunks proves that the closed menu was not downloaded on load.
    await expect(trigger).toHaveAttribute('aria-busy', 'true');
    await expect(trigger).toBeDisabled();
    expect(await trigger.boundingBox()).toEqual(initialBox);
  } finally {
    resumeDownloads();
    await page.unrouteAll({ behavior: 'wait' });
  }
  const dialog = page.getByRole('dialog', { name: 'ナビゲーションメニュー' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveCSS('position', 'fixed');
  await expect(dialog).toHaveCSS('width', '256px');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: '協会について', exact: true }).click();
  await expect(page).toHaveURL('/about');
  await expect(dialog).toBeHidden();
});

test('the deferred secondary menu supports keyboard dismissal and repeated opening', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'その他のメニューを開く' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('menuitem', { name: '様式', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('menu')).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole('menuitem', { name: '様式', exact: true }).click();
  await expect(page).toHaveURL('/forms');
});

test('article sharing loads its clipboard notification when requested', async ({ page, context, browserName }) => {
  if (browserName === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/news/2026-09-24-01');
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  const trigger = page.getByRole('button', { name: '共有メニューを開く' });
  await trigger.click();
  await page.getByRole('menuitem', { name: 'リンクをコピー', exact: true }).click();
  await expect(page.getByText('リンクをクリップボードにコピーしました')).toBeVisible();
  // WebKit allows user-initiated writes, but Playwright cannot grant clipboard-read permission there.
  if (browserName === 'chromium') expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(canonical);
  await expect(trigger).toBeFocused();
});

test('theme switching keeps the icon and accessible name consistent with the selected theme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await expect(page.locator('header .lucide-moon')).toBeVisible();
  await expect(page.locator('header .lucide-sun')).toBeHidden();
  await page.getByRole('button', { name: 'ダークモードに切り替え' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.locator('header .lucide-sun')).toBeVisible();
  await expect(page.locator('header .lucide-moon')).toBeHidden();
  await page.reload();
  await expect(page.getByRole('button', { name: 'ライトモードに切り替え' })).toBeVisible();
  await expect(page.locator('header .lucide-sun')).toBeVisible();
  await page.getByRole('button', { name: 'ライトモードに切り替え' }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
});

test('main navigation remains usable when crossing the desktop breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'メインナビゲーション', includeHidden: true });
  await expect(navigation).toBeHidden();
  await page.setViewportSize({ width: 1280, height: 844 });
  await expect(navigation).toBeVisible();
  await navigation.getByRole('link', { name: '協会について' }).click();
  await expect(page).toHaveURL('/about');
  await expect(navigation.getByRole('link', { name: '協会について' })).toHaveAttribute('aria-current', 'page');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(navigation).toBeHidden();
  await expect(page.getByRole('button', { name: 'メニューを開く', exact: true })).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 844 });
  await navigation.getByRole('link', { name: 'お知らせ' }).click();
  await expect(page).toHaveURL('/news');
  await expect(navigation.getByRole('link', { name: 'お知らせ' })).toHaveAttribute('aria-current', 'page');
});

test('the deferred page-size selector opens by keyboard and preserves its selection', async ({ page }) => {
  await page.goto('/news?size=6', { waitUntil: 'networkidle' });
  const trigger = page.getByRole('combobox', { name: '表示件数' });
  await expect(trigger).toHaveText('6件');
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('listbox')).toBeVisible();
  await page.getByRole('option', { name: '12件', exact: true }).click();
  await expect(page).toHaveURL('/news');
  await expect(trigger).toHaveText('12件');
  await trigger.click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('listbox')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('the deferred entry explanation restores focus and opens repeatedly', async ({ page }) => {
  await page.goto('/competitions');
  const trigger = page.getByRole('button', { name: '申込フォームの説明' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'このお申込みフォームについて' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: '閉じる', exact: true }).click();
  await expect(dialog).toBeHidden();
});

test('footer navigation preserves the selected theme across document loads', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.getByRole('button', { name: 'ダークモードに切り替え' }).click();
  await page.getByRole('contentinfo').getByRole('link', { name: '様式', exact: true }).click();
  await expect(page).toHaveURL('/forms');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('様式');
  await expect(page.locator('html')).toHaveClass(/dark/);
});

test('offscreen links remain reachable by focus and the footer prints fully', async ({ page }) => {
  await page.goto('/projects');
  const archivedDocument = page.getByRole('link', { name: '特記事項', exact: false });
  await archivedDocument.focus();
  await expect(archivedDocument).toBeFocused();
  await expect(archivedDocument).toBeInViewport();
  await page.emulateMedia({ media: 'print' });
  await expect(page.getByRole('contentinfo')).toHaveCSS('content-visibility', 'visible');
});
