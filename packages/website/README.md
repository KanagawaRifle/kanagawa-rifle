# 神奈川県ライフル射撃協会ウェブサイト

Next.js 16 App Router / React 19 / TypeScript / Tailwind CSS 4 で構築しています。
環境構築と検証コマンドは [開発手順](../../DEVELOPMENT.md) を参照してください。
以下の `src/` はこのパッケージからの相対パスです。コマンドはリポジトリのルートで実行します。

## 構成

| ディレクトリ                | 内容                                |
| --------------------------- | ----------------------------------- |
| `src/app`                   | ページ、API、metadata、サイトマップ |
| `src/features/news`         | ニュースの読込・検証・表示          |
| `src/features/competitions` | 大会の日程データ・検証・表示        |
| `src/components`            | 共通 UI                             |
| `src/lib`                   | Markdown 解析などの共通処理         |
| `src/config`                | 環境変数、URL、ナビゲーション設定   |
| `src/contents/news`         | ニュースの Markdown                 |

依存方向は `app → features → components / lib / config` です。異なる機能は `app` で組み合わせます。
ファイルの読込や大会データなど、`server-only` を付けたモジュールはサーバーで扱います。
`npm run lint:architecture` で循環参照と依存方向、クライアント／サーバー境界を検査できます。

## ニュースの更新

記事は `src/contents/news/<年>/<YYYY-MM-DD-NN>.md` に置きます。次のコマンドで指定日の空いている連番に
雛形を作成できます。

```bash
npm run -w @acme/website new:news -- --title '記事タイトル' --date 2026-09-24
```

front matter の `title` と `published` は必須です。`published` と任意の `updated` には
`YYYY-MM-DD` またはタイムゾーン付きの ISO 日時を指定します。
ほかに `tags`、`excerpt`、`eyecatch` を設定できます。詳細は [スキーマ](src/features/news/schema.ts) を参照してください。

本文を記入し、日付とリンクを確認してから `npm run -w @acme/website test:content` を実行します。
このテストは全記事の命名、front matter、日付を検査します。
`npm run lint:markdown` で未定義のリンク参照も確認してください。開発サーバーではページを再読み込みすると
編集内容を確認できます。公開にはデプロイが必要です。

記事の読込・一覧・ページングは `src/features/news/server/news.ts` に集約しています。
ページはこのモジュールから直接データを取得します。詳細ページとホームはビルド時に生成されます。
表示日付は日本時間です。

### 公開ページと API

`/news` の `page` は 1 以上、`size` は 1〜128（既定 12）です。不正値や範囲外のページ、
存在しない記事は 404 を返します。ホームには新着 6 件を表示します。

`/api/news` の日付は ISO 文字列で、一覧の本文は `content: ''` です。
不正な slug は 400、存在しない記事は 404、読込失敗や記事形式の不正は 500 を返します。
エラーの詳細はサーバーログで確認できます。
レスポンスのキャッシュ時間は一覧 5 分、詳細 10 分、`stale-while-revalidate` は 1 時間です。
応答形式とキャッシュの定義は `src/features/news/server/http.ts` にあります。
外部向けの仕様は [OpenAPI 定義](contracts/openapi.json) に記載しています。API を変更した場合は定義も更新し、
`npm run contracts:check` と該当ルートのテストを実行してください。

## 大会年度の追加

1. `src/features/competitions/data/yearYYYY.ts` に年度のデータを作成する。
2. 同じディレクトリの `index.ts` に登録する。
3. ホームなどに表示する年度を切り替える場合は `CURRENT_COMPETITION_YEAR` を変更する。

登録した年度は年度一覧、静的ページ、サイトマップに反映されます。
年度別の名称と URL は `src/config/paths.ts` の `getCompetitionPath` で生成します。

## 環境変数

[.env.example](.env.example) を `.env.local` にコピーして設定します。
公開設定は `src/config/env.ts`、Sentry のビルド設定は `next.config.ts` で読み込みます。
変更後は再ビルドしてください。`npm run contracts:check` は実装の参照名と `.env.example`、Turbo の宣言を照合します。

| 変数                               | 用途                                                                                          |
| ---------------------------------- | --------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_URL`                  | サイトの URL。ローカルは `http://localhost:3000`、Docker は `https://kanagawa-rifle.org.test` |
| `NEXT_PUBLIC_CDN_URL`              | CDN の URL。既定は `https://static.kanagawa-rifle.org`                                        |
| `NEXT_PUBLIC_STATIC_FILE_BASE_URL` | 添付ファイルのルート。未指定なら `<CDN_URL>/website`                                          |
| `NEXT_PUBLIC_SENTRY_DSN`           | Sentry の送信先。空欄で無効                                                                   |

CDN の設定は添付ファイルの URL、画像の許可ホスト、CSP に反映されます。
CSP の `unsafe-eval` は開発時のみ有効です。

`VERCEL_GIT_COMMIT_REF=staging` の環境では、`BASIC_AUTH_ID` と `BASIC_AUTH_PASSWORD` も設定してください。
`src/proxy.ts` が認証を処理し、設定不足なら 500、認証失敗なら 401 を返します。
