// packages/website/e2e/accessibility.spec.ts
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  for (const path of ['/', '/news', '/news/2026-09-24-01']) {
    test(`${path} keeps a sequential heading order`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withRules(['heading-order']).analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test('homepage should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('about page should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/about');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // より詳細なレポートが必要な場合
  test.describe('Detailed Accessibility Report', () => {
    test('generate detailed accessibility report for WCAG compliance', async ({ page }) => {
      await page.goto('/');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // 違反がある場合は詳細を出力
      if (accessibilityScanResults.violations.length > 0) {
        console.log('\n🔍 WCAG Accessibility Violations Found:\n');

        accessibilityScanResults.violations.forEach((violation, index) => {
          console.log(`\n${index + 1}. ${violation.id}: ${violation.description}`);
          console.log(`   Impact: ${violation.impact}`);
          console.log(`   Help: ${violation.help}`);
          console.log(`   Help URL: ${violation.helpUrl}`);
          console.log(`   Affected elements: ${violation.nodes.length}`);

          violation.nodes.forEach((node, nodeIndex) => {
            console.log(`   ${nodeIndex + 1}. ${node.html}`);
            console.log(`      Failure summary: ${node.failureSummary}`);
          });
        });
      }

      // 警告があれば表示
      if (accessibilityScanResults.incomplete.length > 0) {
        console.log('\n⚠️  Incomplete Checks (manual review needed):\n');

        accessibilityScanResults.incomplete.forEach((item, index) => {
          console.log(`${index + 1}. ${item.id}: ${item.description}`);
        });
      }

      // パスした項目数を表示
      console.log(`\n✅ Passed WCAG checks: ${accessibilityScanResults.passes.length}`);

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('generate best practices report (informational)', async ({ page }) => {
      await page.goto('/');

      const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['best-practice']).analyze();

      // ベストプラクティス違反がある場合は詳細を出力（テストは失敗させない）
      if (accessibilityScanResults.violations.length > 0) {
        console.log('\n💡 Best Practice Suggestions:\n');

        accessibilityScanResults.violations.forEach((violation, index) => {
          console.log(`\n${index + 1}. ${violation.id}: ${violation.description}`);
          console.log(`   Impact: ${violation.impact}`);
          console.log(`   Help: ${violation.help}`);
          console.log(`   Help URL: ${violation.helpUrl}`);
          console.log(`   Affected elements: ${violation.nodes.length}`);

          violation.nodes.forEach((node, nodeIndex) => {
            console.log(`   ${nodeIndex + 1}. ${node.html}`);
            console.log(`      Suggestion: ${node.failureSummary}`);
          });
        });

        console.log('\n⚠️  Note: These are best practice recommendations, not WCAG violations.');
        console.log(`   Found ${accessibilityScanResults.violations.length} suggestion(s) for improvement.\n`);
      } else {
        console.log('\n✨ All best practices are being followed!\n');
      }

      // ベストプラクティスは情報提供のみで、テストは失敗させない
      console.log(`✅ Best practice checks completed: ${accessibilityScanResults.passes.length} passed`);
    });
  });
});
