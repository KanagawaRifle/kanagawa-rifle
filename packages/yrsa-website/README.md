# yrsa-website

横須賀市ライフル射撃協会の公式ウェブサイト（`https://yokosuka.kanagawa-rifle.org`）です。
Next.js 16（App Router）、React 19、TypeScript、Tailwind CSS 4 で構成しています。

## 開発

リポジトリのルートで実行します。環境変数は `.env.example` を `.env.local` にコピーして設定してください。

```bash
# 開発サーバー（http://localhost:3000）
npm run -w @acme/yrsa-website dev

# 型・lint・テスト
npm run -w @acme/yrsa-website typecheck
npm run -w @acme/yrsa-website lint
npm run -w @acme/yrsa-website test:coverage

# 本番ビルド（Google Calendar から年間予定 PDF とフィードを更新する）
npm run -w @acme/yrsa-website build

# 検証用ビルド（固定の Calendar 設定と追跡済み PDF を使い、Google API にアクセスしない）
YRSA_VALIDATION_BUILD=1 npm run -w @acme/yrsa-website build
```

ビルドは `public/feed.xml` を書き換えます。検証用ビルドの後は意図しない差分をコミットしないでください。

## 配布

Vercel が `packages/yrsa-website` をルートディレクトリとしてビルドし、`2.x` を本番に配布します。
`vercel.json` の `installCommand` は npm 12.2.1 を導入してから、このワークスペースで `npm ci` を実行します。
ルートだけに宣言された開発依存は入らないため、ビルドに要る依存はこのワークスペースに宣言してください。

Vercel のプロジェクトには次の環境変数を設定します。

| 変数                                    | 用途                          |
| --------------------------------------- | ----------------------------- |
| `NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY`   | Google Calendar API キー      |
| `NEXT_PUBLIC_GOOGLE_CALENDAR_ID_MAIN`   | 予定表示に使うカレンダー      |
| `NEXT_PUBLIC_GOOGLE_CALENDAR_ID_ANNUAL` | 年間予定 PDF に使うカレンダー |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`         | Google Analytics（省略可）    |
