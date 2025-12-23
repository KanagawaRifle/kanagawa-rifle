export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  singleAttributePerLine: false,
  htmlWhitespaceSensitivity: 'css',
  printWidth: 120,
  tabWidth: 2,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cn'],
  overrides: [
    {
      files: '**/*.yml',
      options: {
        tabWidth: 2,
      },
    },
  ],
};
