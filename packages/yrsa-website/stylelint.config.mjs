// SPDX-License-Identifier: MIT
import base from '@acme/stylelint-config';

const config = {
  extends: '@acme/stylelint-config',
  overrides: [
    {
      files: ['app/globals.css'],
      rules: {
        // Tailwind CSS 4 compiles @theme before the stylesheet reaches the browser.
        'at-rule-no-unknown': [
          true,
          { ignoreAtRules: [...base.rules['at-rule-no-unknown'][1].ignoreAtRules, 'theme'] },
        ],
        'scss/at-rule-no-unknown': [
          true,
          { ignoreAtRules: [...base.rules['scss/at-rule-no-unknown'][1].ignoreAtRules, 'theme'] },
        ],
      },
    },
    {
      files: ['**/*.module.css'],
      rules: {
        // CSS Modules uses :global to style FullCalendar's external class names.
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
      },
    },
  ],
};

export default config;
