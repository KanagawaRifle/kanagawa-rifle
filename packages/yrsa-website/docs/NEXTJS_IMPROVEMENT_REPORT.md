# Next.js 改善レポート

## 概要

yrsa.website プロジェクトの Next.js アーキテクチャレビューを実施し、セキュリティ、パフォーマンス、保守性、アクセシビリティの観点から改善を行いました。

**レビュー日**: 2025年12月30日
**対象バージョン**: Next.js 16.1.1, React 19.2.3

---

## 1. セキュリティ強化

### 1.1 セキュリティヘッダーの追加 (middleware.ts)

**新規作成**: `middleware.ts`

実装したセキュリティヘッダー:

| ヘッダー | 値 | 目的 |
|---------|---|------|
| Content-Security-Policy | `default-src 'self'; script-src 'self' 'unsafe-inline' ...` | XSS攻撃防止 |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains` | HTTPS強制 |
| X-Frame-Options | `DENY` | クリックジャッキング防止 |
| X-Content-Type-Options | `nosniff` | MIMEスニッフィング防止 |
| Referrer-Policy | `strict-origin-when-cross-origin` | リファラー制御 |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` | 機能制限 |

### 1.2 XSS 脆弱性の修正

**修正ファイル**: `app/_components/google-calendar.tsx`

**問題**: `dangerouslySetInnerHTML` で外部データを直接描画していた

**対策**: サニタイズユーティリティを作成し適用

```typescript
// lib/sanitize.ts
export function sanitizeHtml(html: string): string {
  // script タグ、イベントハンドラ、javascript: URL を除去
  // 外部リンクに rel="noopener noreferrer" を自動付与
}
```

### 1.3 API 入力バリデーション

**新規作成**: `lib/api/schemas.ts`

Zod スキーマによる型安全な入力検証:

```typescript
export const monthlyResultsQuerySchema = z.object({
  year: yearSchema,      // 2000-2100 範囲チェック
  date: dateSchema,      // YYYY-MM-DD 形式
  event: eventSchema,    // 1-20文字
  name: nameSchema,      // 1-50文字
});
```

**適用済み API Routes**:
- `/api/competitions/monthly/results`
- `/api/competitions/rifle-shooting-class/results`
- `/api/ogp`

---

## 2. パフォーマンス最適化

### 2.1 API キャッシュ戦略

| API エンドポイント | キャッシュ設定 | 理由 |
|-------------------|---------------|------|
| `/api/ogp` | `max-age=604800` (1週間) | OGP画像は変更頻度が低い |
| `/api/competitions/*` | `s-maxage=3600, stale-while-revalidate=86400` | 結果データは1日1回更新 |

### 2.2 SSG 最適化 (確認済み)

- `next.config.ts` で `output: 'export'` 設定済み
- 全ページが静的生成される構成
- 動的 API Routes は API Gateway 経由で提供

### 2.3 画像最適化 (確認済み)

- `next/image` の `Image` コンポーネントを使用
- WebP/AVIF 自動変換対応
- 静的インポートによる自動サイズ最適化

---

## 3. エラーハンドリング

### 3.1 グローバルエラー境界

**新規作成**: `app/error.tsx`

```typescript
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // エラー表示 + リトライボタン
  // 開発モードではエラー詳細表示
}
```

### 3.2 404 ページ

**新規作成**: `app/not-found.tsx`

- Win95 テーマに合わせたデザイン
- トップページへのナビゲーション

### 3.3 ローディング UI

**新規作成**: `app/loading.tsx`

- アクセシビリティ対応 (`motion-safe` メディアクエリ)
- 減速モーション設定ユーザーへの配慮

---

## 4. コード品質

### 4.1 ユニットテスト

**新規作成テストファイル**:

| ファイル | テスト内容 |
|---------|-----------|
| `lib/sanitize.test.ts` | HTML サニタイズ関数 |
| `lib/competitions.test.ts` | 年度計算、CSV パース、ソート |
| `lib/api/schemas.test.ts` | API スキーマバリデーション |

**テストカバレッジ対象**:
- `sanitizeHtml()` - XSS 対策
- `stripHtml()` - HTML タグ除去
- `escapeHtml()` - HTML エスケープ
- `getFiscalYear()` - 年度計算
- `parseCSV()` - CSV パース
- `sortEvents()` - イベントソート
- `parseSearchParams()` - URL パラメータパース

### 4.2 型安全性

- Zod スキーマからの型推論
- `z.infer<typeof schema>` による自動型生成
- API レスポンスの型定義

---

## 5. ファイル構成

### 5.1 新規作成ファイル

```
packages/yrsa.website/
├── middleware.ts                    # セキュリティヘッダー
├── app/
│   ├── error.tsx                    # グローバルエラー境界
│   ├── not-found.tsx                # 404 ページ
│   └── loading.tsx                  # ローディング UI
├── lib/
│   ├── sanitize.ts                  # XSS 対策ユーティリティ
│   ├── sanitize.test.ts             # サニタイズテスト
│   ├── competitions.test.ts         # 競技会ロジックテスト
│   └── api/
│       ├── schemas.ts               # Zod スキーマ
│       └── schemas.test.ts          # スキーマテスト
```

### 5.2 修正ファイル

```
app/_components/google-calendar.tsx  # XSS 修正
app/api/competitions/monthly/results/route.ts      # Zod + キャッシュ
app/api/competitions/rifle-shooting-class/results/route.ts  # Zod + キャッシュ
app/api/ogp/route.ts                 # キャッシュヘッダー追加
```

---

## 6. デプロイチェックリスト

### 6.1 本番デプロイ前の確認事項

- [ ] `npm install` で依存関係をインストール
- [ ] `npm run build` でビルド成功を確認
- [ ] `npm run test` で全テストが通過
- [ ] `npx tsc --noEmit` で型エラーがないことを確認
- [ ] 環境変数の設定確認
  - `NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY`
  - `NEXT_PUBLIC_GOOGLE_CALENDAR_ID`
  - `NEXT_PUBLIC_SITE_URL`

### 6.2 セキュリティチェック

- [ ] CSP ヘッダーが正しく設定されている
- [ ] HTTPS リダイレクトが有効
- [ ] API エンドポイントの入力バリデーション
- [ ] 外部リンクに `rel="noopener noreferrer"` が付与されている

### 6.3 パフォーマンスチェック

- [ ] Lighthouse スコア 90+ (Performance, Accessibility, Best Practices, SEO)
- [ ] Core Web Vitals が良好
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

---

## 7. 今後の推奨事項

### 7.1 優先度: 高

1. **E2E テストの追加**
   - Playwright による主要ページのテスト
   - CI/CD パイプラインへの統合

2. **エラー監視の導入**
   - Sentry または類似サービスの統合
   - エラートラッキングとアラート設定

### 7.2 優先度: 中

1. **アクセシビリティ監査**
   - axe-core による自動テスト
   - スキップリンクの追加
   - フォーカス管理の改善

2. **パフォーマンス監視**
   - Web Vitals のトラッキング
   - パフォーマンスバジェットの設定

### 7.3 優先度: 低

1. **国際化 (i18n) 対応**
   - 英語版ページの追加
   - next-intl の導入検討

2. **PWA 対応**
   - Service Worker の導入
   - オフライン対応

---

## 8. まとめ

本レビューにより、以下の改善を実施しました:

| カテゴリ | 改善数 | 主な内容 |
|---------|-------|---------|
| セキュリティ | 4件 | CSP、HSTS、XSS対策、入力バリデーション |
| パフォーマンス | 2件 | APIキャッシュ、静的生成確認 |
| エラーハンドリング | 3件 | error.tsx、not-found.tsx、loading.tsx |
| テスト | 3ファイル | sanitize、competitions、schemas |

全体として、プロダクション品質のセキュリティとパフォーマンスを確保しつつ、保守性の高いコードベースを実現しました。
