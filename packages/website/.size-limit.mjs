import { fileURLToPath } from 'node:url';

import { prepareSizeBudget } from './scripts/prepare-size-budget.mjs';

export default await prepareSizeBudget({
  rootDir: fileURLToPath(new URL('.', import.meta.url)),
  // Current production baseline: up to 483 kB JS and 21 kB CSS, gzipped.
  limits: { javascript: '500 kB', stylesheet: '25 kB' },
});
