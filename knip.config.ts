import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  workspaces: {
    '.': {
      entry: ['*.config.{js,mjs,cjs,ts}', 'scripts/*.mjs'],
      project: ['*.{js,mjs,cjs,ts}', 'scripts/*.mjs'],
      // The coverage tool resolves Vitest from the selected workspace.
      ignoreDependencies: ['vitest'],
    },
    'packages/website': {
      entry: [
        'src/components/ui/**/*.{ts,tsx}',
        'playwright.*.config.ts',
        'vitest.mutation.config.ts',
        'lighthouse.config.mjs',
        'tests/load/website.js',
      ],
      project: [
        'src/**/*.{ts,tsx,css,mdx}',
        '*.{ts,mjs,cjs}',
        'e2e/**/*.ts',
        'scripts/**/*.{ts,mjs}',
        'tests/load/*.js',
      ],
      ignoreDependencies: [
        // k6 imports are provided by its executable, not npm.
        'k6',
      ],
    },
    'packages/eslint-config': {
      project: ['**/*.js'],
    },
    'packages/prettier-config': {
      project: ['**/*.js'],
    },
    'packages/stylelint-config': {
      project: ['**/*.js'],
    },
    'packages/lighthouse-config': {
      project: ['**/*.{js,cjs}'],
    },
    'packages/typescript-config': {
      entry: ['*.json'],
      ignoreUnresolved: ['^next$'],
    },
  },
  ignoreDependencies: [
    // Loaded through shared configuration rather than direct application imports.
    'eslint-import-resolver-typescript',
    'prettier-plugin-tailwindcss',
    'stylelint-config-recess-order',
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-order',
  ],
  ignoreExportsUsedInFile: true,
  // Public TypeScript contracts remain available to callers.
  exclude: ['types'],
};

export default config;
