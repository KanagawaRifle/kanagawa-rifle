# Lighthouse CI 共有設定

`@acme/lighthouse-config` は各 URL を 3 回測定し、アクセシビリティ、SEO、ベストプラクティスを検査します。
性能スコアは 0.9 を目安に警告を出します。
コンソールエラー、HTTP ステータス、ページタイトル、言語、画像の代替テキスト、リンク名、viewport を明示的に検査します。
URL、サーバー起動、Chrome の設定は [website の設定](../website/.lighthouserc.cjs) で定義します。

HTTP でのローカル測定にはビルドと起動の両方に `LHCI=1` を渡します。
`LHCI=1 npm run -w @acme/website lhci` でビルドと測定を実行できます。
Chrome/Chromium が必要です。標準パスにない場合は `CHROME_PATH` に実行ファイルを指定してください。
