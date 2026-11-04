import { defineConfig, devices } from '@playwright/test';

// Synthetic credentials are used only by the local production test server.
const httpCredentials = { username: 'staging-test-user', password: 'synthetic-staging-password' };

export default defineConfig({
  testDir: './e2e/staging',
  outputDir: './reports/staging-auth',
  forbidOnly: !!process.env.CI,
  workers: 1,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:3131', httpCredentials },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run start -- --hostname 127.0.0.1 --port 3131',
    url: 'http://127.0.0.1:3131',
    reuseExistingServer: false,
    timeout: 120 * 1000,
    env: {
      VERCEL_GIT_COMMIT_REF: 'staging',
      BASIC_AUTH_ID: httpCredentials.username,
      BASIC_AUTH_PASSWORD: httpCredentials.password,
    },
  },
});
