import { resolve } from 'node:path';

import { defineConfig } from '@playwright/test';

import productionConfig from './playwright.config';

export default defineConfig(productionConfig, {
  testDir: './e2e/development',
  testIgnore: [],
  // 初回コンパイルを含む開発サーバーの描画を検証する。
  timeout: 60 * 1000,
  workers: 1,
  reporter: [['html', { outputFolder: 'playwright-report/development' }], ['list']],
  use: { baseURL: 'http://127.0.0.1:3200' },
  webServer: {
    command: 'npm run dev -- -- --hostname 127.0.0.1 --port 3200',
    cwd: resolve(__dirname, '../..'),
    env: { NEXT_PUBLIC_URL: 'http://127.0.0.1:3200' },
    url: 'http://127.0.0.1:3200',
    reuseExistingServer: false,
    timeout: 120 * 1000,
  },
});
