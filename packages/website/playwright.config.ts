import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',

  /* 並列実行の設定 */
  fullyParallel: true,

  /* CI環境での設定 */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  /* レポーター */
  reporter: [['html'], ['list']],

  /* 共通設定 */
  use: {
    /* ベースURL */
    baseURL: 'http://localhost:3000',

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

  /* 開発サーバーの起動 */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
