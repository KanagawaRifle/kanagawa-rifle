// SPDX-License-Identifier: MIT
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import picomatch from 'picomatch';
import ts from 'typescript';

export function environmentReferences(text) {
  const names = new Set();
  const source = ts.createSourceFile('source.tsx', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function visit(node) {
    if (
      (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.expression.getText(source) === 'process' &&
      node.expression.name.text === 'env'
    ) {
      if (ts.isPropertyAccessExpression(node)) names.add(node.name.text);
      else if (ts.isStringLiteral(node.argumentExpression)) names.add(node.argumentExpression.text);
      else throw new Error('Environment names must be static so the configuration can be checked.');
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return [...names].sort();
}

export function checkEnvironment(names, sample, turbo) {
  const platform = new Set(['NODE_ENV', 'CI', 'VERCEL', 'NEXT_RUNTIME', 'VERCEL_GIT_COMMIT_REF']);
  const expected = names.filter((name) => !platform.has(name));
  const documented = new Set([...sample.matchAll(/^\s*(?:#\s*)?([A-Z][A-Z0-9_]*)=/gm)].map((match) => match[1]));
  const errors = expected.filter((name) => !documented.has(name)).map((name) => `.env.example: missing ${name}`);
  for (const task of ['build', 'dev', 'start']) {
    const config = turbo.tasks[task] ?? {};
    const patterns = [
      ...(turbo.globalEnv ?? []),
      ...(turbo.globalPassThroughEnv ?? []),
      ...(config.env ?? []),
      ...(config.passThroughEnv ?? []),
    ];
    // Basic authentication is evaluated at request time by the staging proxy.
    const required = task === 'build' ? expected.filter((name) => !name.startsWith('BASIC_AUTH_')) : expected;
    for (const name of required) {
      if (!patterns.some((pattern) => picomatch.isMatch(name, pattern))) errors.push(`turbo ${task}: missing ${name}`);
    }
  }
  return errors;
}

async function sourceFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['__tests__', 'testing'].includes(entry.name) || /\.(test|spec|stories)\./.test(entry.name)) continue;
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await sourceFiles(file)));
    else if (/\.[cm]?[jt]sx?$/.test(entry.name)) files.push(file);
  }
  return files;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const files = [
    ...(await sourceFiles(resolve(root, 'src'))),
    ...['next.config.ts', 'sentry.server.config.ts', 'sentry.edge.config.ts'].map((file) => resolve(root, file)),
  ];
  const names = [
    ...new Set(
      (await Promise.all(files.map(async (file) => environmentReferences(await readFile(file, 'utf8'))))).flat(),
    ),
  ];
  const errors = checkEnvironment(
    names,
    await readFile(resolve(root, '.env.example'), 'utf8'),
    JSON.parse(await readFile(resolve(root, '../../turbo.json'), 'utf8')),
  );
  if (errors.length) throw new Error(errors.join('\n'));
  console.log(`Validated ${names.length} environment references, sample declarations and Turbo inputs.`);
}
