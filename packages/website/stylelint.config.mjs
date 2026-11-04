const config = {
  extends: ['@acme/stylelint-config'],
  rules: {
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['theme', 'plugin', 'custom-variant', 'apply', 'reference', 'source'] },
    ],
    'scss/at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['theme', 'plugin', 'custom-variant', 'apply', 'reference', 'source'] },
    ],
    'import-notation': 'string',
    // Keep the site's existing CSS notation and grouped theme variables.
    'hue-degree-notation': 'number',
    'custom-property-empty-line-before': null,
    'at-rule-empty-line-before': ['always', { except: ['first-nested', 'blockless-after-same-name-blockless'] }],
    'value-keyword-case': ['lower', { ignoreProperties: ['font-family', '--font-sans'] }],
    'media-feature-range-notation': 'prefix',
  },
};

export default config;
