# 神奈川県ライフル射撃協会ウェブサイト

Next.js 16 App Router / React 19 / TypeScript / Tailwind CSS 4 で構築しています。
環境構築と検証コマンドは [開発手順](../../DEVELOPMENT.md) を参照してください。
以下の `src/` はこのパッケージからの相対パスです。コマンドはリポジトリのルートで実行します。

## 構成

| ディレクトリ                  | 内容                                |
| ----------------------------- | ----------------------------------- |
| `src/app`                     | ページ、API、metadata、サイトマップ |
| `src/features/news`           | ニュースの読込・検証・表示          |
| `src/features/competitions`   | 大会の日程データ・検証・表示        |
| `src/features/membership`     | 入会手順・公開済みの会費・料金表    |
| `src/features/recommendation` | 推薦手数料・掲載資料・表示          |
| `src/components`              | 共通 UI                             |
| `src/lib`                     | Markdown 解析などの共通処理         |
| `src/config`                  | 環境変数、URL、ナビゲーション設定   |
| `src/contents/news`           | ニュースの Markdown                 |

依存方向は `app → features → components / lib / config` です。異なる機能は `app` で組み合わせます。
`components` は `lib` と `config` を利用でき、`lib` と `config` から UI への依存は禁止します。
ページ構成と大会年度の選択は `app/competitions/_components`、大会自体の表示は `features/competitions/components` が担当します。
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
記事本文と front matter の解析は `server/parse-article.ts`、ニュース URL の組立ては `features/news/paths.ts` が担当します。
ページは `server/news.ts` から直接データを取得します。詳細ページとホームはビルド時に生成されます。
表示日付は日本時間です。

Markdown は `lib/markdown/parse.ts` で一度だけ解析し、同じ構文木から本文と目次を生成します。
React による表示は `components/Markdown` にまとめています。記事中の HTML はリポジトリで管理する信頼済みの入力を前提とし、
リンクと埋め込みの URL 検査を維持しています。外部ユーザーが投稿する HTML のサニタイザーとしては使いません。

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

ホームの大会カードは `homeNotice.published` が `true` の大会を、大会一覧と逆の順序で表示します。

## SEO と検索エンジン向けの出力

`src/lib/metadata.ts` でページごとの title、description、canonical、Open Graph、Twitter Card、robots を生成します。
ページ追加時は実際の本文に対応するタイトル・説明と `path` を指定してください。
`PageLayout` の `page` にも同じ `path` と説明を渡し、構造化データと canonical を一致させます。
主要ページの案内名は `src/config/paths.ts` の `name`、検索タイトルと画面の h1 は `title` で管理します。
お知らせの検索タイトルには公開日を付け、同じ件名の過去記事を区別できるようにしています。
`NEXT_PUBLIC_URL` は本番で `https://kanagawa-rifle.org` に設定します。canonical、構造化データ、
サイトマップ、共有画像の URL はこの値を基準にするため、プレビュー URL を本番ビルドに使わないでください。

- 通常のページは自己参照 canonical を持ち、計測用パラメーターを含めません。
- お知らせ一覧は `/news`、`/news?page=2` のようにページごとの canonical を出力します。
  `page=1` と既定の `size=12` は内部リンクと canonical から省きます。
- 既定以外の表示件数は `size` を保持し、`noindex, follow` とします。異なる記事集合を持つページを
  一律に先頭ページへ正規化しません。不正な値・重複パラメーター・範囲外ページは 404 のままです。
- 一覧の番号付きページ送りは、先頭・末尾と現在の前後のページへ通常のリンクを出力します。
  現在のページに `aria-current="page"` を付け、表示件数と canonical の規則を保ちます。
- 記事の説明は `excerpt` を優先し、未指定・空欄なら表示用 Markdown 構文木から最大160文字の説明を生成します。
  記事の公開日時・更新日時を Open Graph と Article の JSON-LD に出力し、更新日は本文にも表示します。
- SportsOrganization、WebSite、WebPage、Article は共通の `@id` で関連付けます。
  協会紹介は AboutPage、一覧は CollectionPage とし、お知らせ一覧は表示中の記事と順序を ItemList に出力します。
  パンくずは画面の階層と同じ BreadcrumbList を出力し、2ページ目以降はそのページ自身の URL を指します。
- 協会情報は `src/config/organization.ts` に集約し、事務局の画面表示と構造化データで同じ連絡先を使います。
  `sameAs` は `src/config/social.ts` に掲載する協会の公式 SNS のみを使用します。
- 記事の発信元を本文に表示し、協会紹介へリンクします。本文に画像がある場合は、最初の表示対象画像を
  Article の `image` と Open Graph・Twitter Card に使用します。画像がない記事には Article の画像を捏造せず、
  SNS 共有用に従来のタイトル画像を生成します。非表示要素・コード内の画像や不正な URL は対象外です。
- 記事末尾に前後のお知らせの件名・公開日・リンクを表示します。Git にある記事の一覧順を使い、
  年度をまたぐ場合や先頭・末尾の記事、記事の削除にも対応します。
- 大会の JSON-LD は協会の共通 `@id` を主催者に使い、開催・中止・日程変更の状態を区別します。
  日程変更には公表済みの旧日程を `previousStartDate` に出力します。
- ページタイトルを唯一の h1 とし、記事本文に h1 がある場合は本文の見出しを1段下げます（上限 h6）。
  見出しの ID は維持し、目次も表示する階層に合わせます。
- サイトマップには公開ページ、大会年度、全記事、既定表示件数の一覧ページを含めます。
  記事の `lastmod` は `updated`、未指定なら `published` を使い、ビルド時刻で更新日を捏造しません。
- `/api/news` とその詳細 API は `X-Robots-Tag: noindex` とし、HTML の記事を検索対象にします。
  `/api/og`、画像、CSS、JavaScript はクロールを許可します。
- ホームは主要な告知と案内リンクを先に表示し、その下のポスター画像を遅延読込します。
  ニュース一覧の装飾アイコンはサーバーで描画し、不要なクライアント処理を避けます。
  記事画像の `sizes` は本文の表示幅に合わせます。
  共有操作の通知コンポーネントは記事ページだけで読み込み、他ページの初期 JavaScript を減らします。
  遅延読込や画像サイズを変更する場合は、Lighthouse とモバイル表示で確認してください。

`VERCEL_ENV` が設定されていて `production` 以外、または `VERCEL_GIT_COMMIT_REF=staging` の場合は、
全レスポンスの `X-Robots-Tag` とページの robots に `noindex` を設定し、サイトマップを空にします。
robots.txt はサイトマップを広告しませんが、noindex を読み取れるようクロール自体は許可します。
Basic 認証は引き続き staging ブランチに適用します。Vercel 変数のない自己ホスト環境は検索対象です。
これらの設定はビルド時に決まり、変更後は再ビルド・再デプロイが必要です。Turbo のキャッシュも環境ごとに分離します。

ホームには入会・大会・申込書への案内リンクを置き、JavaScript が無効でも利用できます。
入会・申請書・推薦・大会ページにも、次の手続きや関連資料への案内リンクを置いています。
主要ページの紹介文と検索向けの説明は、実際に公開している内容に合わせて更新してください。
事業計画の2021年度資料は、旧サイトから移行した `migration/` 配下の公開ファイルへリンクします。

`e2e/seo.spec.ts` は本番サーバーの初期 HTML を取得し、canonical、SNS メタデータ、構造化データの関連、
表示記事と ItemList の一致、記事本文の見出しと目次、
ページング、404、robots.txt、サイトマップ、API ヘッダー、共有画像の応答を検証します。
更新フィードと記事一覧の一致、公開日付きタイトル、JavaScript 無効時の案内リンク・番号付きページ送り、
モバイル幅での表示も検証します。

```bash
LHCI=1 npm run -w @acme/website test:e2e -- --project=chromium --project="Mobile Chrome"
```

公開後は管理者が [Google Search Console](https://search.google.com/search-console) で
`https://kanagawa-rifle.org/sitemap.xml` を送信し、主要ページと2ページ目以降を URL 検査してください。
検索パフォーマンスでは検索語句、表示回数、クリック数、CTR、掲載順位の推移を確認します。
Core Web Vitals は実ユーザーのデータで確認し、ローカルの Lighthouse 計測と区別してください。
HTML メタタグで所有権を確認する場合は、管理画面が発行した `content` の値だけを
`GOOGLE_SITE_VERIFICATION` または `BING_SITE_VERIFICATION` に設定して再ビルド・再デプロイします。
未設定・空欄・プレビューでは確認用メタタグを出力しません。DNS による確認も引き続き利用できます。
確認コードの取得、管理画面での所有権確認、サイトマップ送信は管理者のアカウントで行ってください。
構造化データの表示可否は [リッチリザルト テスト](https://search.google.com/test/rich-results) で確認します。
大会一覧の SportsEvent は日程の意味付けであり、個別イベントのリッチリザルト表示を保証するものではありません。

### お知らせの更新フィード

`/feed.xml` は新着20件の Atom 1.0 フィードです。絶対 URL、公開日、実際の更新日、本文から生成した説明、
タグを UTF-8 の XML で配信します。記事が空の場合を含め、ビルド時刻を更新日として使いません。
Git の記事をデプロイ時に読み込んで静的生成し、独立した TTL やクライアントキャッシュは追加していません。
通常ページの `rel="alternate"` とフッターから購読でき、フィード自体は `X-Robots-Tag: noindex` とします。
プレビューではフィードを404にし、案内メタデータとフッターの購読リンクも出力しません。
フィードは全記事を含む XML サイトマップを補完するもので、置き換えません。
Google が対応する形式と提出方法は [サイトマップの公式資料](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=ja) を参照してください。

### 本番ドメインの正規化

`next.config.ts` は www から `https://kanagawa-rifle.org` への恒久リダイレクトを設定し、パスとクエリを保持します。
本番ドメインの HTTPS 証明書と HTTP の転送は、DNS・ホスティング側でも設定と検証が必要です。
Vercel の `kanagawa-rifle-website` プロジェクトの Settings → Domains でも、
`www.kanagawa-rifle.org` から `kanagawa-rifle.org` への 308 リダイレクトを設定しています。
2026年9月30日に www のドメインを追加し、証明書のホスト名不一致を解消しました。
HTTPS 接続と、パス・クエリを保持した転送を公開 URL で確認済みです。
HTTP の www は HTTPS の www を経由して正式ドメインへ転送されます。

実装方針は Google の [ページ分割](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading?hl=ja)、
[robots メタタグ](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=ja)、
[記事の構造化データ](https://developers.google.com/search/docs/appearance/structured-data/article?hl=ja)、
[組織の構造化データ](https://developers.google.com/search/docs/appearance/structured-data/organization?hl=ja)、
[サイトマップ](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=ja) のガイドに合わせています。

## 入会・推薦案内の更新

入会の料金は `src/features/membership/fees.ts`、推薦手数料と掲載するブレッテンの番号は
`src/features/recommendation/data.ts` で管理します。金額は公開済みの案内を明示的に保存しており、
年齢や日付からの自動切替、料金の自動計算は行いません。変更時は該当する案内を確認し、表示テストも更新してください。

入会手順は `features/membership/components/MembershipApplication.tsx`、推薦の注意事項は
`app/recommendation/page.tsx` にあります。会費表は行・列の見出しを持ち、狭い画面では表の領域を横にスクロールできます。

## 環境変数

[.env.example](.env.example) を `.env.local` にコピーして設定します。
公開設定は `src/config/env.ts`、Sentry のビルド設定は `next.config.ts` で読み込みます。
変更後は再ビルドしてください。`npm run contracts:check` は実装の参照名と `.env.example`、Turbo の宣言を照合します。

ブラウザーの Sentry 設定では、ビルド時に検証済みの `NEXT_PUBLIC_SENTRY_DSN` を直接参照します。
空欄・未設定のビルドでは初期化・画面遷移の計測・例外送信を行わず、不要な SDK を除去できるようにしています。
DSN がある場合は初期表示からエラー監視・Session Replay・画面遷移の計測を有効にし、従来のサンプリング率を維持します。
ブラウザーに `config/env.ts` を取り込まないことで、Zod の検証コードと動的コード生成に伴う CSP 違反を避けます。
設定値の Zod 検証は `next.config.ts` とサーバーで継続し、CSP の `unsafe-eval` は本番で許可しません。
Session Replay の圧縮用 Worker は `worker-src 'self' blob:` で許可します。
Clarity が取得する `https://c.bing.com` の画像は `img-src` で許可します。
Sentry のビルドプラグインが要求する webpack は開発依存に明示し、ライセンス一覧の生成時にも解決できるようにしています。

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
