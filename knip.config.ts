import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  workspaces: {
    '.': {
      entry: ['*.config.{js,mjs,cjs,ts}', 'scripts/*.mjs'],
      project: ['*.{js,mjs,cjs,ts}', 'scripts/*.mjs'],
      // The coverage tool resolves Vitest from the selected workspace.
      ignoreDependencies: ['vitest', 'textlint-rule-*'],
    },
    'packages/website': {
      entry: [
        'src/components/ui/**/*.{ts,tsx}',
        'playwright.*.config.ts',
        'vitest.mutation.config.ts',
        '.lighthouserc.cjs',
      ],
      project: ['src/**/*.{ts,tsx}', '*.{ts,mjs,cjs}', 'e2e/**/*.ts'],
      // These are loaded by Textlint configuration or Tailwind CSS directives.
      ignoreDependencies: [
        '@textlint-ja/*',
        'textlint-rule-*',
        'sudachi-synonyms-dictionary',
        'tw-animate-css',
        '@tailwindcss/typography',
        'tailwindcss',
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
      project: ['**/*.json'],
      ignoreUnresolved: ['^next$'],
    },
  },
  ignore: ['**/node_modules/**', '**/.next/**', '**/dist/**'],
  ignoreDependencies: [
    // Loaded through shared configuration rather than direct application imports.
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
