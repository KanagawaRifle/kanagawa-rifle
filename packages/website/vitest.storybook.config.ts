import { resolve } from 'node:path';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [storybookTest({ configDir: resolve(__dirname, '.storybook') })],
  test: {
    name: 'storybook',
    reporters: ['default', 'junit'],
    outputFile: { junit: 'reports/storybook/storybook.xml' },
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
  },
});
