# ESLint 共有設定

`@acme/eslint-config` は import の順序、重複、未使用 import を検査し、Prettier と競合するルールを無効にします。
TypeScript 用のルールは、利用側の Next.js TypeScript preset の後に適用してください。

`@acme/eslint-config/vitest` と `@acme/eslint-config/testing-library` はテスト品質用の追加 preset です。
`.test.ts` / `.test.tsx` に適用し、Playwright の `.spec.ts` には適用しません。
実際の組み合わせは [website の設定](../website/eslint.config.mjs) を参照してください。
検査ルールの回帰テストは `npm run -w @acme/eslint-config test` で実行します。
