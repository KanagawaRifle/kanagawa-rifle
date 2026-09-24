# 開発手順

## ローカル環境

Node.js 24.21.0 / npm 11.19.0 を使います。Volta を使うと、ルートの `package.json` に指定した
バージョンが選択されます。以下のコマンドはリポジトリのルートで実行してください。

```bash
npm ci
# 初回のみ。既存の設定は上書きしない
[ -f packages/website/.env.local ] || cp packages/website/.env.example packages/website/.env.local
npm run dev
```

開発 URL は `http://localhost:3000` です。`make setup` でも環境ファイルの作成、依存関係の
インストール、環境診断を実行できます。環境の確認だけなら `npm run doctor` を使います。

Docker の起動手順は [README](README.md#クイックスタート) を参照してください。
VS Code の Dev Containers にも対応しています。ホストとコンテナーは `node_modules` や `.next` を
共有するため、インストール・ビルド・開発サーバーを同時に実行しないでください。

MinIO はイメージの取得に失敗するため利用できません（2026-09-24 確認）。
サイトの開発には `node` と `https-portal` を起動してください。

## 検証

`npm run check` で型、lint、依存関係、ライセンス、検査スクリプトを確認します。
`npm run qa` はこれに本番ビルド、サイズ検査、単体テストのカバレッジ、`npm audit --audit-level=high` を加えます。

```bash
npm run check
npm run test:coverage
npm run -w @acme/website test:content
npm run build
```

カバレッジの下限は行・関数・分岐・ステートメントの各 80% です。
記事の更新手順と構成は [website README](packages/website/README.md) を参照してください。

### ブラウザと Storybook

```bash
npx playwright install chromium
npm run -w @acme/website test:e2e:dev -- --project=chromium --project="Mobile Chrome"
LHCI=1 npm run -w @acme/website test:e2e -- --project=chromium --project="Mobile Chrome"
npm run -w @acme/website build-storybook
```

Playwright がサーバーを起動します。`test:e2e` は本番ビルドを `127.0.0.1:3100` で、
`test:e2e:dev` は開発サーバーを `127.0.0.1:3200` で検証します。実行前に手動の開発サーバーを停止してください。
`LHCI=1` はローカル HTTP 用に CSP の HTTPS 強制を無効にする設定で、ビルドと起動の両方に必要です。

### 個別の検査

| コマンド                                     | 用途                                                                |
| -------------------------------------------- | ------------------------------------------------------------------- |
| `npm run lint:architecture`                  | 循環参照、依存方向、クライアント／サーバー境界                      |
| `npm run syncpack`                           | ワークスペース間の依存バージョン                                    |
| `npm run knip`                               | 未使用ファイル・依存・エクスポート                                  |
| `npm run cspell`                             | スペル。固有名詞は `packages/website/.cspell.dict.txt` に登録       |
| `npm run license-check`                      | 依存パッケージのライセンス                                          |
| `npm run coverage:diff -- --base origin/2.x` | 指定コミットからの変更行のカバレッジ                                |
| `npm run size-limit`                         | ビルド済みページの初期 JS/CSS サイズ。gzip で 500 kB / 25 kB が上限 |
| `npm run -w @acme/website test:mutation`     | ニュース入力スキーマのミューテーションテスト。スコア 95% 未満で失敗 |
| `npm run -w @acme/website analyze`           | Webpack のバンドル分析                                              |
| `npm run lint:infra`                         | Docker で ShellCheck・actionlint・Hadolint・zizmor を実行           |

`coverage:diff` はコミット間の比較です。checkout と同じコミットで生成したカバレッジの JSON レポートを使います。
Lighthouse の実行方法は [共有設定の README](packages/lighthouse-config/README.md) を参照してください。

ルートの `lint:text` は開発文書の日本語と英語の間のスペースを検査します。
記事の文章表現は `npm run -w @acme/website lint:text` で検査できます。
大会名の連続漢字やリンクだけの段落など、過去記事にも指摘が残るため、この検査は任意です。

## パッケージ管理

依存関係は利用するワークスペースへ追加します。

```bash
npm install -w @acme/website <package-name>
npm install -D -w @acme/website <package-name>
```

ルートの `package-lock.json` もコミットしてください。共有設定を変更した場合は、
ルートで `npm run check`、`npm run test`、`npm run build` を実行して利用側を確認します。

本番依存のライセンス全文は `npm run license-report` で `packages/website/THIRD-PARTY-LICENSES.txt` に、
SBOM は `npm run --silent sbom > bom.json` で出力できます。生成したレポートは Git の管理対象外です。

## CI と公開

`CI Required` は品質検査、ブラウザテスト、インフラ検査の結果を集約します。
カバレッジ、SBOM、ライセンス全文は Actions の artifact、Lighthouse はジョブの summary と artifact に出力します。
Dependency Review、OSV、CodeQL、Gitleaks も実行します。CodeQL と Dependency Review の利用可否はリポジトリの設定に依存します。

Dependabot はワークスペースの依存をまとめて更新します。開発依存と Actions の minor / patch 更新は
自動マージの対象です。本番依存と major 更新はレビューしてください。
ラベルは `.github/labels.yml` で定義し、`Sync Labels` の手動実行で作成・更新します。
公開時は [公開前の確認](.github/PRE_RELEASE_CHECKLIST.md) を使ってください。
