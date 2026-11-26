import base from '@acme/eslint-config';
import testingLibrary from '@acme/eslint-config/testing-library';
import vitest from '@acme/eslint-config/vitest';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const config = [
  { ignores: ['.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts'] },
  ...nextVitals,
  ...nextTs,
  ...base,
  vitest,
  { ...testingLibrary, files: ['__tests__/components/**/*.test.{ts,tsx}'] },
];

export default config;
