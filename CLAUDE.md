# CLAUDE.md

本ドキュメントは Claude Code がプロジェクトを理解するためのガイドです。

## プロジェクト設定

### Git コミットルール

**重要**: このプロジェクトでは以下のプロセスを厳守してください：

1. コードを変更したら `git add` でステージング
2. 変更内容を日本語で要約して説明
3. 「この内容でコミットしますか？」と確認を求め、コミットメッセージを表示
4. 明示的な承認があるまで `git commit` を実行しない

### コミット前チェックリスト

- [ ] 変更内容を確認した
- [ ] テストが通ることを確認した
- [ ] コミットメッセージが適切である

## プロジェクト概要

特定非営利活動法人 神奈川県ライフル射撃協会の公式ウェブサイトです。

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router, Turbopack)
- **言語**: TypeScript 5
- **UI**: React 19, Material-UI 7, Tailwind CSS 4
- **状態管理**: TanStack React Query 5
- **コンテンツ**: Markdown (remark/rehype)
- **カレンダー**: FullCalendar (Google Calendar 連携)
- **エラートラッキング**: Sentry
- **ロギング**: Axiom
- **パッケージ管理**: npm workspaces + Turbo

## ディレクトリ構造

```
kanagawa-rifle/
├── packages/
│   ├── website/                # メイン Next.js アプリ
│   │   ├── src/
│   │   │   ├── app/            # Next.js App Router (ページ)
│   │   │   ├── components/     # 共有コンポーネント
│   │   │   ├── lib/            # ユーティリティ関数
│   │   │   ├── config/         # 設定ファイル
│   │   │   └── contents/       # 静的コンテンツ (ニュース記事等)
│   │   ├── e2e/                # Playwright E2E テスト
│   │   └── public/             # 静的ファイル
│   ├── eslint-config/          # ESLint 共有設定
│   ├── prettier-config/        # Prettier 共有設定
│   └── lighthouse-config/      # Lighthouse CI 共有設定
├── turbo.json                  # Turbo モノレポ設定
└── package.json                # ルート package.json
```

## Docker 開発環境

**重要**: npm コマンドは `./docker/docker-compose.yml` で定義された Docker コンテナ内で実行してください。

```bash
# コンテナ起動
cd docker && docker compose up -d

# コンテナ内でコマンドを実行
docker exec kanagawa-rifle_node <コマンド>
```

## 開発コマンド

### website パッケージ

```bash
# 開発サーバー起動 (Turbopack)
docker exec kanagawa-rifle_node npm run -w @kanagawa-rifle/website dev

# ビルド
docker exec kanagawa-rifle_node npm run -w @kanagawa-rifle/website build

# Lint (ESLint, Prettier, textlint)
docker exec kanagawa-rifle_node npm run -w @kanagawa-rifle/website lint

# 自動修正
docker exec kanagawa-rifle_node npm run -w @kanagawa-rifle/website fix

# ユニットテスト
docker exec kanagawa-rifle_node npm run -w @kanagawa-rifle/website test

# E2E テスト
docker exec kanagawa-rifle_node npm run -w @kanagawa-rifle/website test:e2e

# アクセシビリティテスト
docker exec kanagawa-rifle_node npm run -w @kanagawa-rifle/website test:a11y
```

### パッケージ管理

```bash
# ワークスペースへのパッケージ追加
docker exec kanagawa-rifle_node npm i -w <ワークスペース名> <パッケージ名>

# 全ワークスペースへのインストール
docker exec kanagawa-rifle_node npm i -ws <パッケージ名>
```

## コーディング規約

### パスエイリアス

```typescript
// @/* → ./src/*
import { Component } from "@/components";
import { config } from "@/config";
```

### ファイル構成

- ページ: `src/app/` 配下に配置 (App Router)
- コンポーネント: `src/components/` に共有コンポーネント
- ページ固有コンポーネント: `src/app/<page>/_components/` に配置
- ユーティリティ: `src/lib/` に配置
- 設定: `src/config/` に配置

### テスト

- ユニットテスト: `__tests__/` ディレクトリに `*.test.ts(x)` で配置
- E2E テスト: `e2e/` ディレクトリに配置
- カバレッジ閾値: 80%

### 日本語テキスト

textlint により日本語の品質管理を行っています。コンテンツ追加時は `npm run -w @kanagawa-rifle/website lint:text` で確認してください。

## ブランチ戦略

- メインブランチ: `1.x`
- 機能ブランチ: `feature/<作者>/<領域>/<機能名>`

## 重要な設定ファイル

| ファイル | 説明 |
|---------|------|
| `packages/website/next.config.ts` | Next.js 設定 |
| `packages/website/tsconfig.json` | TypeScript 設定 |
| `packages/website/tailwind.config.ts` | Tailwind CSS 設定 |
| `packages/website/vitest.config.ts` | Vitest 設定 |
| `packages/website/playwright.config.ts` | Playwright 設定 |
| `packages/website/.textlintrc.mjs` | textlint 設定 (日本語) |
| `turbo.json` | Turbo モノレポ設定 |

## 注意事項

- コミットメッセージは commitlint (Conventional Commits) に従う
- PR 作成前に `npm run -w @kanagawa-rifle/website lint` と `npm run -w @kanagawa-rifle/website test` を実行
- 画像は `static.kanagawa-rifle.org` の外部ドメインから配信
