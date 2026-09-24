// SPDX-License-Identifier: MIT
module.exports = {
  forbidden: [
    { name: 'no-circular', severity: 'error', from: {}, to: { circular: true } },
    {
      name: 'no-unresolved-imports',
      severity: 'error',
      from: {},
      to: { couldNotResolve: true },
    },
    {
      name: 'shared-is-independent',
      severity: 'error',
      from: { path: '^src/(components|config|hooks|lib|providers)/' },
      to: { path: '^src/(features|app)/' },
    },
    {
      name: 'features-do-not-import-routes',
      severity: 'error',
      from: { path: '^src/features/' },
      to: { path: '^src/app/' },
    },
  ],
  options: {
    exclude: { path: '(__tests__|/testing/|\\.(test|spec|stories)\\.)' },
    doNotFollow: { path: 'node_modules' },
    tsConfig: { fileName: 'tsconfig.json' },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },
  },
};
