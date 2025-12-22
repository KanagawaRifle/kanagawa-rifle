const config = {
  // Website パッケージ
  'packages/website/**/*.{ts,tsx,js,jsx}': () => [
    'npm run -w @kanagawa-rifle/website lint:eslint',
  ],
  'packages/website/**/*.{ts,tsx,js,jsx,json,css,md}': () => [
    'npm run -w @kanagawa-rifle/website lint:prettier',
  ],

  // 共有設定パッケージ
  'packages/eslint-config/**/*.js': () => [
    'prettier --check packages/eslint-config',
  ],
  'packages/prettier-config/**/*.js': () => [
    'prettier --check packages/prettier-config',
  ],
  'packages/stylelint-config/**/*.js': () => [
    'prettier --check packages/stylelint-config',
  ],
  'packages/lighthouse-config/**/*.{js,cjs}': () => [
    'prettier --check packages/lighthouse-config',
  ],

  // ルート設定ファイル
  '*.{js,mjs,cjs,ts,json}': () => ['prettier --check ./*.{js,mjs,cjs,ts,json}'],
};

export default config;
