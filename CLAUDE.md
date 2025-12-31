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

# ビルド（NODE_ENV=production が必須）
docker exec kanagawa-rifle_node sh -c "NODE_ENV=production npm run -w @kanagawa-rifle/website build"

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

- メインブランチ: `2.x` (PR はこちらに向けて作成)
- レガシーブランチ: `1.x`
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

## 開発における注意点

### ビルド時の NODE_ENV

Docker コンテナは `NODE_ENV=development` で起動しているため、ビルド時は明示的に `NODE_ENV=production` を指定する必要がある。指定しないと React hooks のエラーが発生する。

```bash
# 正しいビルドコマンド
docker exec kanagawa-rifle_node sh -c "NODE_ENV=production npm run -w @kanagawa-rifle/website build"
```

### App Router のみ使用

このプロジェクトは App Router のみを使用している。Pages Router (`src/pages/`) は不要。Sentry との互換性のために Pages Router スタブファイルを作成する必要はない。

### API エラーハンドリング

fetch API を使用する際は、`response.json()` を呼ぶ前に `response.ok` をチェックする。サーバーがエラーを返した場合、レスポンスボディが JSON でない可能性があるため。

```typescript
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP エラー: ${response.status}`);
}

const result = await response.json();
```

### クライアントコンポーネントの SSG 対応

`next-axiom` の `AxiomWebVitals` など、クライアント専用のコンポーネントは SSG 時にエラーを起こす可能性がある。`useEffect` + `useState` でマウント後にのみレンダリングするラッパーを使用する。

```typescript
// src/components/AxiomWebVitalsWrapper.tsx
'use client';

import { AxiomWebVitals } from 'next-axiom';
import { useEffect, useState } from 'react';

export function AxiomWebVitalsWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <AxiomWebVitals />;
}
```

### ロギング

`console.log` の代わりに `@/lib/logger` を使用する。Axiom に送信され、エラーレベルは Sentry にも連携される。

```typescript
import { logger } from '@/lib/logger';

logger.info('情報メッセージ', { context: 'value' });
logger.warn('警告メッセージ', { context: 'value' });
logger.error('エラーメッセージ', { error: err.message });
```

### React key のベストプラクティス

配列をマップする際、`key={index}` ではなく一意な識別子を使用する。

```typescript
// NG
{items.map((item, index) => <Item key={index} {...item} />)}

// OK
{items.map((item) => <Item key={item.id} {...item} />)}
{items.map((item) => <Item key={item.slug} {...item} />)}
```

## 今後の課題

### SEO・コンテンツ改善

技術的な SEO 対策は実装済み（JSON-LD、メタデータ、sitemap 等）。今後は**コンテンツの質と量**が検索順位向上の鍵となる。

#### 高優先度

- [ ] **FAQ ページの作成** (`/faq`)
  - FAQPage JSON-LD スキーマ付きで実装
  - 「ライフル射撃を始めるには？」「銃の所持許可について」等
  - 長尾キーワードでの流入増加が期待できる

- [ ] **「準備中」コンテンツの解消** (`/about`)
  - 協会の歴史・沿革
  - 組織図・役員紹介
  - 活動実績

#### 中優先度

- [ ] **初心者向けガイド**
  - 「ライフル射撃の始め方」
  - 「エアライフルとビームライフルの違い」
  - 「射撃体験会」案内

- [ ] **大会結果アーカイブ**
  - 過去の大会結果をデータベース化
  - 選手名での検索流入

- [ ] **射撃場ガイド（神奈川県）**
  - 地域検索キーワード対応

#### 低優先度

- [ ] 選手インタビュー・活動報告（継続的な運用が必要）
- [ ] ニュース記事の sitemap 追加（技術的課題あり）

### 技術的な改善

- [ ] `about/page.tsx` の重複 Organization JSON-LD を削除（layout.tsx で定義済み）
