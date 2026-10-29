// SPDX-License-Identifier: MIT
import { fileURLToPath } from 'node:url';

import { createWebsiteVitestConfig } from '@sasakiuri/repo-tooling/vitest';

const config = async () => {
  const shared = await createWebsiteVitestConfig(fileURLToPath(new URL('.', import.meta.url)));
  return {
    ...shared,
    test: {
      ...shared.test,
      server: {
        deps: {
          // Resolve the linked adapter through Vite so it uses this workspace's Vitest.
          inline: ['@testing-library/jest-dom'],
        },
      },
    },
    resolve: {
      ...shared.resolve,
      dedupe: ['vitest'],
    },
  };
};

export default config;
