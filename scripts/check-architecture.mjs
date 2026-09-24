import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import madge from 'madge';
import ts from 'typescript';

/** Check resolved runtime imports, including dependencies behind barrels and aliases. */
export async function checkArchitecture(sourceDir, tsConfig) {
  const result = await madge(sourceDir, {
    baseDir: sourceDir,
    fileExtensions: ['ts', 'tsx'],
    tsConfig,
    excludeRegExp: [/\/(?:__tests__|testing)\//, /\.(?:test|spec|stories)\./],
    detectiveOptions: { ts: { skipTypeImports: true }, tsx: { skipTypeImports: true } },
  });
  const graph = result.obj();
  const violations = result.circular().map((cycle) => `Circular import: ${cycle.join(' -> ')}`);
  const clients = new Set();
  const servers = new Set();

  for (const file of Object.keys(graph)) {
    const source = ts.createSourceFile(file, await readFile(resolve(sourceDir, file), 'utf8'), ts.ScriptTarget.Latest);
    for (const statement of source.statements) {
      if (
        ts.isExpressionStatement(statement) &&
        ts.isStringLiteral(statement.expression) &&
        statement.expression.text === 'use client'
      ) {
        clients.add(file);
      }
      if (
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        statement.moduleSpecifier.text === 'server-only'
      ) {
        servers.add(file);
      }
    }
    for (const dependency of graph[file]) {
      const feature = file.match(/^features\/([^/]+)\//)?.[1];
      const dependencyFeature = dependency.match(/^features\/([^/]+)\//)?.[1];
      if (!file.startsWith('app/') && dependency.startsWith('app/')) {
        violations.push(`Route dependency: ${file} -> ${dependency}`);
      }
      if (/^(components|config|hooks|lib|providers)\//.test(file) && dependencyFeature) {
        violations.push(`Shared module depends on feature: ${file} -> ${dependency}`);
      }
      if (feature && dependencyFeature && feature !== dependencyFeature) {
        violations.push(`Cross-feature dependency: ${file} -> ${dependency}`);
      }
    }
  }

  for (const client of clients) {
    const visited = new Set();
    function visit(file, chain) {
      if (visited.has(file)) return;
      visited.add(file);
      if (servers.has(file)) {
        violations.push(`Client imports server-only module: ${[...chain, file].join(' -> ')}`);
        return;
      }
      for (const dependency of graph[file] ?? []) visit(dependency, [...chain, file]);
    }
    visit(client, []);
  }

  return { violations, moduleCount: Object.keys(graph).length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const website = fileURLToPath(new URL('../packages/website/', import.meta.url));
  const { violations, moduleCount } = await checkArchitecture(
    resolve(website, 'src'),
    resolve(website, 'tsconfig.json'),
  );
  if (violations.length) {
    console.error(violations.join('\n'));
    process.exitCode = 1;
  } else {
    console.log(
      `Architecture checks passed (${moduleCount} modules): no cycles, invalid layer dependencies or client/server leaks.`,
    );
  }
}
