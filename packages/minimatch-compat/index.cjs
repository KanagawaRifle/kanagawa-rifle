// SPDX-License-Identifier: MIT
const { minimatch } = require('minimatch-v11');

// Older ESLint packages require a callable CommonJS export. Matching remains
// entirely in minimatch 11; no legacy parser or generated RegExp is retained.
function adapt(matcher) {
  const match = (path, pattern, options) => matcher(path, pattern, options);
  class Minimatch extends matcher.Minimatch {
    // eslint-plugin-import only calls .test() on the result of makeRe().
    // Returning a test interface keeps the non-backtracking matching engine.
    makeRe() {
      return { test: (path) => this.match(path) };
    }

    static defaults(options) {
      return adapt(matcher.defaults(options)).Minimatch;
    }
  }

  return Object.assign(match, matcher, {
    Minimatch,
    defaults: (options) => adapt(matcher.defaults(options)),
    makeRe: (pattern, options) => new Minimatch(pattern, options).makeRe(),
  });
}

module.exports = adapt(minimatch);
