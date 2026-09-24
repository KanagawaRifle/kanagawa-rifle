import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import base from '@acme/eslint-config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  ...nextVitals,
  ...nextTypescript,
  ...base,
  ...storybook.configs['flat/recommended'],
];

export default eslintConfig;
