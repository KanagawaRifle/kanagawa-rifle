# 神奈川県ライフル射撃協会ウェブサイト

Next.js 16 App Router / React 19。Node.js 24.21.0 と npm 11.19.0 を使用する。
リポジトリのルートで依存関係をインストールする。

```bash
npm ci
cp packages/website/.env.example packages/website/.env.local
npm run -w @acme/website dev
```

開発 URL は `http://localhost:3000`。ニュース取得のための別サーバーや内部 API URL は不要。
本番では `NEXT_PUBLIC_URL` に公開 URL を指定する。CDN の既定値は `https://static.kanagawa-rifle.org`。
監視・アクセス解析は対応する環境変数で設定する。空の `NEXT_PUBLIC_SENTRY_DSN` は監視を無効にする。

## データと描画

- `src/contents/news/<年>/<YYYY-MM-DD-NN>.md`: ニュースの本文と front matter。
- `src/features/news/server/news.ts`: サーバー専用の記事列挙・読込・ページング。
- `src/features/news/schema.ts`: front matter とページング入力の検証。
- `src/app/news`: 一覧、本文、metadata、JSON-LD をサーバーで生成する。
- `src/app/api/news`: 同じデータアクセスを使う公開 JSON API。
- `src/app/sitemap.ts`: 全記事と実際の公開日・更新日を列挙する。
- `src/lib/ReactMarkdown`: 本文と目次を一度の解析結果から生成する。
- `src/features/competitions`: 年度別データ、日程の型と検証、ホームと大会ページで共有する表示。

ブラウザーでの処理は件数変更、共有、テーマ切替などの操作に限定する。
記事は Git で管理し、追加・修正はデプロイで公開する。詳細ページとホームはビルド時に生成される。
ファイル一覧の独自 TTL や React Query のキャッシュは持たない。
開発サーバーでは Markdown の編集後にページを再読み込みする。

`/news` の `page` は 1 以上、`size` は 1〜128（既定 12）。不正値・範囲外ページは 404。
ホームは常に新着 6 件を表示する。不正 slug と不存在記事も公開ページでは 404。
API は既存の応答形式を維持し、不正 slug は 400、不存在は 404、読込・内容不正は 500。
API の日付は ISO 文字列。一覧には従来どおり `content: ''` を返す。
API のレスポンスキャッシュは一覧 5 分・詳細 10 分、SWR 1 時間を維持する。

## 検証

```bash
npm run -w @acme/website lint:eslint
npm run -w @acme/website typecheck
npm run -w @acme/website test
npm run -w @acme/website test:content
npm run -w @acme/website build
npx playwright install chromium
LHCI=1 npm run -w @acme/website test:e2e -- --project=chromium --project="Mobile Chrome"
npm run -w @acme/website build-storybook
```

Playwright はビルド後に `127.0.0.1:3100` で本番サーバーを起動する。既存サーバーは再利用しない。
ローカル HTTP 検証では `LHCI=1` をビルドと起動の両方に渡し、CSP の HTTPS 強制を無効にする。
全記事検証は Markdown を直接読み、欠落・命名・front matter・日付の不正を検出する。
CI は lint、型検査、記事検証、単体テストとカバレッジ、およびデスクトップ・モバイルの公開ページ導線を実行する。

ステージング認証は `src/proxy.ts` で処理する。`VERCEL_GIT_COMMIT_REF=staging` の場合は
`BASIC_AUTH_ID` / `BASIC_AUTH_PASSWORD` を実行環境に設定する。
設定不足は 500、認証失敗は 401。matcher の適用範囲は既存構成を維持する。

## Docker

`docker/node/Dockerfile` も Node.js 24.21.0 を使う。
Docker での公開 URL に合わせ、`packages/website/.env.local` の `NEXT_PUBLIC_URL` を
`https://kanagawa-rifle.org.test` に設定する。
コンテナーは `LOCAL_UID` / `LOCAL_GID`（既定 1000）で実行し、ホストの生成物を root 所有にしない。
必要なら起動前に次を指定する。

```bash
export LOCAL_UID=$(id -u)
export LOCAL_GID=$(id -g)
cd docker
# docker/.env を設定してから実行
# HTTPS プロキシ経由: https://kanagawa-rifle.org.test
docker compose up -d node https-portal
```

既存の root 所有の `node_modules` / `.next` は、所有権を修正するか退避してから再生成する。
ホストとコンテナーで同時にインストール・ビルドしない。
