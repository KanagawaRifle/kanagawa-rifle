# 開発手順

## ローカル環境

Node.js 24.21.0 / npm 11.19.0 を使います。バージョンの定義はルートの
`package.json` の `volta` と `packageManager` にあります。Volta を使う場合は
リポジトリ内で指定バージョンが選択されます。

以下はリポジトリのルートで実行します。

```bash
npm ci
# 初回のみ。既存の設定は上書きしない
[ -f packages/website/.env.local ] || cp packages/website/.env.example packages/website/.env.local
npm run dev
```

開発 URL は `http://localhost:3000` です。Docker で開発する場合は
[ルート README](README.md) の手順を使い、ホスト側のインストールやビルドと同時に実行しないでください。
ルートの `npm run dev` は、シェルで指定した環境変数も開発サーバーへ渡します。

## 実装と検証

構成、依存方向、記事・大会の更新方法は [website README](packages/website/README.md) を参照してください。

```bash
npm run lint:architecture
npm run -w @acme/website lint:eslint
npm run -w @acme/website typecheck
npm run -w @acme/website test -- --coverage
npm run -w @acme/website test:content
npm run -w @acme/website build
```

`lint:architecture` は循環参照、共通モジュールから機能への依存、機能間の直接依存、
画面ルートへの逆方向の依存、クライアントからサーバー専用モジュールへの依存を検査します。
検査自体の回帰テストも実行します。共通部品が必要なら `components`、共通処理なら `lib` へ置きます。

ブラウザでの確認は以下を使います。Playwright が本番サーバーを起動するため、手動での起動は不要です。

```bash
npx playwright install chromium
npm run -w @acme/website test:e2e:dev -- --project=chromium --project="Mobile Chrome"
LHCI=1 npm run -w @acme/website test:e2e -- --project=chromium --project="Mobile Chrome"
npm run -w @acme/website build-storybook
```

`LHCI=1` はローカル HTTP 用の設定で、ビルドとサーバー起動の両方に適用します。
`test:e2e:dev` は `127.0.0.1:3200` で開発サーバーを起動し、CSP、ハイドレーション、対話部品を検証します。
手動起動中の開発サーバーは先に停止してください。
共有設定を変更した場合はルートの `npm run lint`、`npm run typecheck`、
`npm run test`、`npm run build` でも利用側を確認します。

## パッケージ管理

依存関係は利用するワークスペースへ追加します。

```bash
npm install -w @acme/website <package-name>
npm install -D -w @acme/website <package-name>
```

実行時に必要な依存は `dependencies`、ビルド・検証ツールは `devDependencies` に置きます。
共有パッケージも明示的に宣言し、ルートの `package-lock.json` を更新します。
パッケージマネージャーは npm に統一します。

新しいワークスペースはルートの `package.json` の `workspaces` に登録します。

## 整形

変更したファイルを共有 Prettier 設定で整形し、ESLint の import 順序も確認します。
過去記事や変更していないファイルまで一括整形しないでください。

```bash
npm run -w @acme/website lint:prettier
npm run -w @acme/website lint:eslint
```

## Git 管理の確認

`npm run lint:tracked` は、ignore 対象のファイルが Git 管理下に入っていないか確認します。
生成物、ローカル環境変数、テスト出力はコミットしません。
ルートの `package-lock.json` と `packages/website/.lighthouserc.cjs` は共有に必要な設定として管理します。
`next dev` が自動生成する `packages/website/AGENTS.md` と `CLAUDE.md` はローカルの補助ファイルとして除外し、
プロジェクト固有の指示はルートの `AGENTS.md` で管理します。

整形はルートと各ワークスペースで同じ Prettier 設定を使用します。
