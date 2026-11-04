import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  testIgnore: ['**/development/**', '**/staging/**'],

  /* 並列実行の設定 */
  fullyParallel: true,

  /* CI環境での設定 */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  /* レポーター */
  reporter: [['html'], ['list'], ['junit', { outputFile: 'reports/playwright-junit.xml' }]],

  /* 共通設定 */
  use: {
    /* ベースURL */
    baseURL: 'http://127.0.0.1:3100',

    /* 失敗時のトレース */
    trace: 'on-first-retry',

    /* スクリーンショット */
    screenshot: 'only-on-failure',

    /* ビデオ */
    video: 'retain-on-failure',
  },

  /* テスト対象のブラウザとデバイス */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* モバイルブラウザ */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* npm run test:e2e でビルドした本番サーバーを検証 */
  webServer: {
    command: 'npm run start -- --hostname 127.0.0.1 --port 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: false,
    timeout: 120 * 1000,
  },
});
