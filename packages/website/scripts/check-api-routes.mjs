// SPDX-License-Identifier: MIT
import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import ts from 'typescript';

export function routeOperations(filename, text) {
  const route =
    '/' +
    filename
      .replace(/\/route\.[jt]s$/, '')
      .split('/')
      .filter((part) => !/^\(.+\)$/.test(part))
      .map((part) => part.replace(/^\[([^\]]+)\]$/, '{$1}'))
      .join('/');
  const methods = [];
  const source = ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, true);
  for (const statement of source.statements) {
    if (!statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    const names = ts.isFunctionDeclaration(statement)
      ? [statement.name?.text]
      : ts.isVariableStatement(statement)
        ? statement.declarationList.declarations.map((declaration) => declaration.name.getText(source))
        : [];
    for (const name of names)
      if (/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)$/.test(name ?? '')) methods.push(`${name.toLowerCase()} ${route}`);
  }
  if (!methods.length) throw new Error(`No explicit HTTP method found in ${filename}`);
  return methods;
}

export async function checkApiRoutes(directory, contract) {
  const actual = [];
  async function walk(current, relative = 'api') {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      if (entry.isDirectory() && !entry.name.startsWith('_'))
        await walk(resolve(current, entry.name), `${relative}/${entry.name}`);
      else if (/^route\.[jt]s$/.test(entry.name))
        actual.push(
          ...routeOperations(`${relative}/${entry.name}`, await readFile(resolve(current, entry.name), 'utf8')),
        );
    }
  }
  await walk(directory);
  const expected = Object.entries(contract.paths).flatMap(([route, operations]) =>
    Object.keys(operations)
      .filter((method) => /^(get|post|put|delete|patch|head|options)$/.test(method))
      .map((method) => `${method} ${route}`),
  );
  const missing = actual.filter((operation) => !expected.includes(operation));
  const stale = expected.filter((operation) => !actual.includes(operation));
  if (missing.length || stale.length)
    throw new Error(`API contract differs from routes. Missing: ${missing.join(', ')}; stale: ${stale.join(', ')}`);
  return actual.length;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const count = await checkApiRoutes(
    resolve(root, 'src/app/api'),
    JSON.parse(await readFile(resolve(root, 'contracts/openapi.json'), 'utf8')),
  );
  console.log(`Verified ${count} API operations against the OpenAPI contract.`);
}
