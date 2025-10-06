// packages/website/.lighthouserc.cjs

/* eslint-disable @typescript-eslint/no-require-imports */
const base = require('@kanagawa-rifle/lighthouse-config').default;

module.exports = {
  ...base,
  ci: {
    ...base.ci,
    collect: {
      ...base.ci.collect,
      url: [
        'http://localhost:3000',
        'http://localhost:3000/about',
        'http://localhost:3000/competitions',
        'http://localhost:3000/forms',
        'http://localhost:3000/join',
        'http://localhost:3000/links',
        'http://localhost:3000/projects',
        'http://localhost:3000/recommendation',
      ],
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready - started server',
      startServerReadyTimeout: 60000,
    },
  },
};
