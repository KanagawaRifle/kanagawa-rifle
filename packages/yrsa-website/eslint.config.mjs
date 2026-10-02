import base from '@sasakiuri/eslint-config';
import testingLibrary from '@sasakiuri/eslint-config/testing-library';
import vitest from '@sasakiuri/eslint-config/vitest';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const config = [
  { ignores: ['.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts'] },
  ...base,
  vitest,
  { ...testingLibrary, files: ['__tests__/components/**/*.test.{ts,tsx}'] },
  ...[...nextVitals, ...nextTs].map((config) => {
    if (!config.plugins?.['@typescript-eslint']) return config;
    const { '@typescript-eslint': _typescript, ...plugins } = config.plugins;
    return { ...config, plugins };
  }),
];

export default config;
