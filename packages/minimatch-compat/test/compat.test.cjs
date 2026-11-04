// cspell:words extglobs nocase globparts
const assert = require('node:assert/strict');
const { test } = require('node:test');

const minimatch = require('../index.cjs');

test('supports callable legacy matching, extglobs, dotfiles, and negation', () => {
  assert.equal(minimatch('src/example.test.ts', '**/*.{ts,tsx}'), true);
  assert.equal(minimatch('src/example.js', '**/*.{ts,tsx}'), false);
  assert.equal(minimatch('AlertDialog', '+(Alert|Confirm)Dialog'), true);
  assert.equal(minimatch('.config.js', '*.js'), false);
  assert.equal(minimatch('.config.js', '*.js', { dot: true }), true);
  assert.equal(minimatch('example.ts', '!*.js'), true);
  assert.equal(minimatch('example.js', '!*.js'), false);
  assert.deepEqual(minimatch.match(['a.ts', 'b.js'], '*.ts'), ['a.ts']);
});

test('supports ESLint partial directory matching and scoped defaults', () => {
  const matcher = new minimatch.Minimatch('src/**/*.ts', { dot: true });
  assert.equal(matcher.match('src', true), true);
  assert.equal(matcher.match('other', true), false);
  assert.equal(matcher.match('src/.hidden.ts'), true);
  const configured = minimatch.defaults({ dot: true }).defaults({ nocase: true });
  assert.equal(configured('.FILE.TS', '*.ts'), true);
  assert.equal(new configured.Minimatch('*.ts').match('.FILE.TS'), true);
  assert.equal(new (configured.Minimatch.defaults({ matchBase: true }))('*.ts').match('src/.FILE.TS'), true);
});

test('supports the makeRe().test() interface used by import restrictions', () => {
  const matcher = minimatch.makeRe('@acme/*');
  assert.equal(matcher.test('@acme/website'), true);
  assert.equal(matcher.test('@acme/website/internal'), false);
  assert.equal(minimatch.defaults({ nocase: true }).makeRe('*.ts').test('FILE.TS'), true);
  assert.equal(new minimatch.Minimatch('!internal/**').makeRe().test('internal/secret'), false);
});

test('bounds globparts amplification instead of allocating exponentially', () => {
  const matcher = new minimatch.Minimatch('**/../a/b/'.repeat(8) + 'file', {
    optimizationLevel: 2,
    braceExpandMax: 16,
  });
  assert.ok(matcher.globParts.length <= 16);
});
