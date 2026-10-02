// SPDX-License-Identifier: MIT
import { fileURLToPath } from 'node:url';

import { createWebsiteVitestConfig } from '@sasakiuri/repo-tooling/vitest';

const config = () => createWebsiteVitestConfig(fileURLToPath(new URL('.', import.meta.url)));

export default config;
