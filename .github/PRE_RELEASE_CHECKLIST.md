# 公開前の確認

- [ ] 公開するコミットと、差し戻し先のコミットを確認した。
- [ ] `CI Required` とセキュリティ検査の結果、Lighthouse のレポートを確認した。
- [ ] 記事・大会の日付、リンク、一覧・詳細ページ、サイトマップを確認した。
- [ ] 公開環境の URL、CDN、監視、ステージング認証の設定を確認した。

公開後は `SMOKE_BASE_URL=<公開 URL> npm run -w @acme/website test:deployment` を実行し、
主要ページとニュースの導線を確認します。

## リポジトリを public に変更する場合

- [ ] 全ブランチ・PR 参照の Git 履歴、Issue・PR、保存中の Actions ログ・成果物を検査した。
- [ ] 記事・過去資料・画像・コミットの著者情報を含めて公開範囲を確認した。
- [ ] `npm audit` の結果を確認し、本番依存と開発用ツールの脆弱性に対応した。
- [ ] ステージングの API・prefetch を含む認証と、ホスティング側のプレビュー保護を確認した。
- [ ] Actions の既定 Workflow permissions を Read repository contents and packages permissions にした。
- [ ] `node scripts/setup-branch-protection.mjs` で適用予定の ruleset を確認した。
- [ ] 可視性の変更直後に `node scripts/setup-branch-protection.mjs --apply --repo KanagawaRifle/kanagawa-rifle` を実行し、保護の適用を確認した。
- [ ] 外部 fork の Actions 実行承認、Secret scanning、Push protection、非公開の脆弱性報告を確認した。
- [ ] public 用の CodeQL・Dependency Review・SARIF 登録が次の CI で成功することを確認した。

可視性の変更で過去の Actions ログも公開されます。検査で漏えいが見つかった場合は認証情報を失効・再発行し、
対象の履歴や記録の扱いを確認してください。記録の削除だけでは認証情報の失効にはなりません。
