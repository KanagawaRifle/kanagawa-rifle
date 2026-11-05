import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import * as yaml from 'js-yaml';

const workflow = (name) =>
  yaml.load(readFileSync(new URL(`../.github/workflows/${name}.yml`, import.meta.url), 'utf8'));
const code = workflow('codeql');
const dependency = workflow('dependency-review').jobs['dependency-review'].steps;
const security = workflow('security');
const scorecard = workflow('scorecard').jobs.scorecard.steps;

for (const isPrivate of [true, false]) {
  for (const enabled of [undefined, 'false', 'true']) {
    test(`security checks for private=${isPrivate}, CODE_SECURITY_ENABLED=${enabled}`, () => {
      const context = {
        github: { event: { repository: { private: isPrivate } } },
        vars: { CODE_SECURITY_ENABLED: enabled },
      };
      const evaluate = (condition) => runInNewContext(condition.replace(/^\$\{\{\s*|\s*\}\}$/g, ''), context);
      const nativeChecks = !isPrivate || enabled === 'true';

      assert.equal(evaluate(code.jobs.analyze.if), nativeChecks);
      assert.equal(evaluate(code.jobs.semgrep.if), !nativeChecks);
      assert.equal(evaluate(dependency.find((step) => step.name === 'Dependency Review').if), nativeChecks);
      for (const step of dependency.filter((step) => step.if && step.name !== 'Dependency Review')) {
        assert.equal(evaluate(step.if), !nativeChecks);
      }
      for (const job of Object.values(security.jobs)) {
        assert.equal(evaluate(job.with['upload-sarif']), nativeChecks);
      }
      assert.equal(evaluate(scorecard.find((step) => step.name === 'Upload SARIF results').if), nativeChecks);
    });
  }
}
