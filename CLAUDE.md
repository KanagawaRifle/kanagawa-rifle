# CLAUDE.md

本ドキュメントは Claude Code がプロジェクトを理解するためのガイドです。

## AI駆動開発 共通ガイドライン

思考は英語で行い、最終的な出力は必ず日本語で提供してください。

### 開発の基本理念

- 動くコードを書くだけでなく、品質・保守性・安全性を常に意識する
- プロジェクトの段階（プロトタイプ、MVP、本番環境）に応じて適切なバランスを取る
- 問題を見つけたら放置せず、必ず対処または明示的に記録する
- ボーイスカウトルール：エラーを見つけた時よりも良い状態で残す

### エラーハンドリングの原則

- 関連が薄く見えるエラーでも必ず解決する
- エラーの抑制（@ts-ignore、try-catch で握りつぶす等）ではなく、根本原因を修正
- 早期にエラーを検出し、明確なエラーメッセージを提供
- エラーケースも必ずテストでカバーする
- 外部APIやネットワーク通信は必ず失敗する可能性を考慮

### コード品質の基準

- DRY原則：重複を避け、単一の信頼できる情報源を維持
- 意味のある変数名・関数名で意図を明確に伝える
- プロジェクト全体で一貫したコーディングスタイルを維持
- 小さな問題も放置せず、発見次第修正（Broken Windows理論）
- コメントは「なぜ」を説明し、「何を」はコードで表現

### テスト規律

- テストをスキップせず、問題があれば修正する
- 実装詳細ではなく振る舞いをテスト
- テスト間の依存を避け、任意の順序で実行可能に
- テストは高速で、常に同じ結果を返すように
- カバレッジは指標であり、質の高いテストを重視

### 保守性とリファクタリング

- 機能追加と同時に既存コードの改善を検討
- 大規模な変更は小さなステップに分割
- 使用されていないコードは積極的に削除
- 依存関係は定期的に更新（セキュリティと互換性のため）
- 技術的負債は明示的にコメントやドキュメントに記録

### セキュリティの考え方

- APIキー、パスワード等は環境変数で管理（ハードコード禁止）
- すべての外部入力を検証
- 必要最小限の権限で動作（最小権限の原則）
- 不要な依存関係を避ける
- セキュリティ監査ツールを定期的に実行

### パフォーマンスの意識

- 推測ではなく計測に基づいて最適化
- 初期段階から拡張性を考慮
- 必要になるまでリソースの読み込みを遅延
- キャッシュの有効期限と無効化戦略を明確に
- N+1問題やオーバーフェッチを避ける

### 信頼性の確保

- タイムアウト処理を適切に設定
- リトライ機構の実装（指数バックオフを考慮）
- サーキットブレーカーパターンの活用
- 一時的な障害に対する耐性を持たせる
- 適切なログとメトリクスで可観測性を確保

### プロジェクトコンテキストの理解

- ビジネス要件と技術要件のバランスを取る
- 現在のフェーズで本当に必要な品質レベルを判断
- 時間制約がある場合でも、最低限の品質基準を維持
- チーム全体の技術レベルに合わせた実装選択

### トレードオフの認識

- すべてを完璧にすることは不可能（銀の弾丸は存在しない）
- 制約の中で最適なバランスを見つける
- プロトタイプなら簡潔さを、本番なら堅牢性を優先
- 妥協点とその理由を明確にドキュメント化

### Git運用の基本

- コンベンショナルコミット形式を使用（feat:, fix:, docs:, test:, refactor:, chore:）
- コミットは原子的で、単一の変更に焦点を当てる
- 明確で説明的なコミットメッセージを日本語で記述
- main/masterブランチへの直接コミットは避ける

### コードレビューの姿勢

- レビューコメントは建設的な改善提案として受け取る
- 個人ではなくコードに焦点を当てる
- 変更の理由と影響を明確に説明
- フィードバックを学習機会として歓迎

### デバッグのベストプラクティス

- 問題を確実に再現できる手順を確立
- 二分探索で問題の範囲を絞り込む
- 最近の変更から調査を開始
- デバッガー、プロファイラー等の適切なツールを活用
- 調査結果と解決策を記録し、知識を共有

### 依存関係の管理

- 本当に必要な依存関係のみを追加
- package-lock.json等のロックファイルを必ずコミット
- 新しい依存関係追加前にライセンス、サイズ、メンテナンス状況を確認
- セキュリティパッチとバグ修正のため定期的に更新

### ドキュメントの基準

- READMEにプロジェクトの概要、セットアップ、使用方法を明確に記載
- ドキュメントをコードと同期して更新
- 実例を示すことを優先
- 重要な設計判断はADR (Architecture Decision Records)で記録

### 継続的な改善

- 学んだことを次のプロジェクトに活かす
- 定期的に振り返りを行い、プロセスを改善
- 新しいツールや手法を適切に評価して取り入れる
- チームや将来の開発者のために知識を文書化

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
docker exec kanagawa-rifle_node npm run -w @acme/website dev

# ビルド（NODE_ENV=production が必須）
docker exec kanagawa-rifle_node sh -c "NODE_ENV=production npm run -w @acme/website build"

# Lint (ESLint, Prettier, textlint)
docker exec kanagawa-rifle_node npm run -w @acme/website lint

# 自動修正
docker exec kanagawa-rifle_node npm run -w @acme/website fix

# ユニットテスト
docker exec kanagawa-rifle_node npm run -w @acme/website test

# E2E テスト
docker exec kanagawa-rifle_node npm run -w @acme/website test:e2e

# アクセシビリティテスト
docker exec kanagawa-rifle_node npm run -w @acme/website test:a11y
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

textlint により日本語の品質管理を行っています。コンテンツ追加時は `npm run -w @acme/website lint:text` で確認してください。

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
- PR 作成前に `npm run -w @acme/website lint` と `npm run -w @acme/website test` を実行
- 画像は `static.kanagawa-rifle.org` の外部ドメインから配信

## 開発における注意点

### ビルド時の NODE_ENV

Docker コンテナは `NODE_ENV=development` で起動しているため、ビルド時は明示的に `NODE_ENV=production` を指定する必要がある。指定しないと React hooks のエラーが発生する。

```bash
# 正しいビルドコマンド
docker exec kanagawa-rifle_node sh -c "NODE_ENV=production npm run -w @acme/website build"
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
