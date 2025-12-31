import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import base from '@acme/eslint-config';
import { FlatCompat } from '@eslint/eslintrc';
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// read /.gitignore
const gitignoreContent = readFileSync(resolve(__dirname, '../../.gitignore'), 'utf-8');

// .gitignore to array
const gitignorePatterns = gitignoreContent
  .split('\n')
  .filter((line) => line.trim() && !line.startsWith('#'))
  .map((line) => line.trim());

const eslintConfig = [
  {
    ignores: [...gitignorePatterns],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...base,
  ...storybook.configs['flat/recommended'],
];

export default eslintConfig;
