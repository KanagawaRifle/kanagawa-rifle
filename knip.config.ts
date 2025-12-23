import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  eslint: false,
  workspaces: {
    '.': {
      entry: ['*.config.{js,mjs,cjs,ts}'],
      project: ['*.{js,mjs,cjs,ts}'],
    },
    'packages/website': {
      entry: ['src/app/**/*.{ts,tsx}', 'src/middleware.ts'],
      project: ['src/**/*.{ts,tsx}'],
      ignore: ['src/**/*.test.{ts,tsx}', 'e2e/**/*'],
    },
    'packages/eslint-config': {
      entry: ['index.js'],
      project: ['**/*.js'],
    },
    'packages/prettier-config': {
      entry: ['index.js'],
      project: ['**/*.js'],
    },
    'packages/stylelint-config': {
      entry: ['index.js'],
      project: ['**/*.js'],
    },
    'packages/lighthouse-config': {
      entry: ['index.cjs'],
      project: ['**/*.{js,cjs}'],
    },
    'packages/typescript-config': {
      entry: ['*.json'],
      project: ['**/*.json'],
    },
  },
  ignore: ['**/node_modules/**', '**/.next/**', '**/dist/**'],
  ignoreDependencies: [
    // Implicitly used by Next.js or build tools
    'sharp',
    'encoding',
  ],
};

export default config;
