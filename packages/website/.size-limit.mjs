import { fileURLToPath } from 'node:url';

import { prepareSizeBudget } from './scripts/prepare-size-budget.mjs';

export default await prepareSizeBudget({
  rootDir: fileURLToPath(new URL('.', import.meta.url)),
  // Gzip baselines: 183 kB JS (including nomodule), 11 kB CSS, and 47 kB HTML.
  limits: { javascript: '225 kB', stylesheet: '20 kB', html: '50 kB' },
});
