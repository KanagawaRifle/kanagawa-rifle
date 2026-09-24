# Lighthouse 共有設定

`@acme/lighthouse-config` はモバイルとデスクトップの測定条件、スコアの下限、必須の監査項目を定義します。
各ページを 3 回測定し、中央値を使います。性能は 0.9、アクセシビリティと SEO は 1.0、ベストプラクティスは 0.96 が下限です。
モバイルの性能スコアは警告、デスクトップではエラーとして扱います。監査自体の失敗や結果の欠落もエラーです。

対象ページは [website の設定](../website/lighthouse.config.mjs) にあります。
Playwright の Chromium と本番ビルドを使い、一時ポートでサーバーを起動します。

```bash
npm run -w @acme/website test:install
npm run -w @acme/website lhci
# ビルド済みの場合。ページや端末を絞って測定
npm run -w @acme/website lhci:run -- --profile=desktop --page=home --runs=1
```

`lhci` はビルドと起動の両方に `LHCI=1` を設定します。
HTML・JSON レポートと `summary.json` は `packages/website/.lighthouse.reports/` に保存します。
CI では artifact とジョブの summary から確認できます。
