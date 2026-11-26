export default {
  '*.{md,txt}': () => 'npm run lint:text',
  'packages/website/**/*.{ts,tsx,js,jsx,mjs,cjs}': () => 'npm run -w @acme/website lint:eslint',
  'packages/website/src/**/*.css': () => 'npm run -w @acme/website lint:styles',
  'packages/website/src/contents/**/*.md': () => 'npm run -w @acme/website test:content',
  'packages/yrsa-website/**/*.{ts,tsx,js,jsx,mjs,cjs}': () => 'npm run -w @acme/yrsa-website lint:eslint',
  'packages/yrsa-website/app/**/*.css': () => 'npm run -w @acme/yrsa-website lint:styles',
  '*.{js,mjs,cjs,ts,tsx,json,css,md,yml,yaml}':
    'prettier --ignore-path .gitignore --ignore-path .prettierignore --check',
};
