import { readFile } from 'node:fs/promises';

const summary = JSON.parse(await readFile(new URL('../.lighthouse.reports/summary.json', import.meta.url), 'utf8'));
console.log('| Profile | Page | Performance | Accessibility | Best practices | SEO |');
console.log('| --- | --- | --- | --- | --- | --- |');
for (const page of Object.values(summary.pages)) {
  const scores = ['performance', 'accessibility', 'best-practices', 'seo'].map((key) =>
    Number.isFinite(page.median[key]) ? Math.round(page.median[key] * 100) : 'error',
  );
  console.log(`| ${page.profile} | ${page.path} | ${scores.join(' | ')} |`);
}
if (summary.errors.length) console.log(`\nErrors: ${summary.errors.join('; ')}`);
