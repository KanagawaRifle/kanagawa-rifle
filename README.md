# kanagawa-rifle

特定非営利活動法人 神奈川県ライフル射撃協会の公式ウェブサイト

## クイックスタート

```bash
# リポジトリをクローン
git clone https://github.com/kanagawa-rifle/kanagawa-rifle.git
cd kanagawa-rifle

# 初回 checkout の設定ファイルを用意し、必要な値を編集する
cp packages/website/.env.example packages/website/.env.local
cp docker/.env.example docker/.env
# packages/website/.env.local の NEXT_PUBLIC_URL を https://kanagawa-rifle.org.test に変更
export LOCAL_UID=$(id -u)
export LOCAL_GID=$(id -g)

# node サービスが依存関係をインストールして開発サーバーを起動する
cd docker
docker compose up -d --build node https-portal
```

## モノレポ構成

```
kanagawa-rifle/
├── packages/
│   ├── website/           # Next.js メインアプリ
│   ├── eslint-config/     # ESLint 共有設定
│   ├── prettier-config/   # Prettier 共有設定
│   ├── stylelint-config/  # Stylelint 共有設定
│   ├── typescript-config/ # TypeScript 共有設定
│   └── lighthouse-config/ # Lighthouse CI 設定
├── docker/                # Docker 開発環境
└── turbo.json             # Turborepo 設定
```

## 主要コマンド

| コマンド                    | 説明                                       |
| --------------------------- | ------------------------------------------ |
| `npm run dev`               | 開発サーバーを起動                         |
| `npm run lint`              | 全パッケージの lint を実行                 |
| `npm run typecheck`         | 全パッケージの型検査                       |
| `npm run lint:architecture` | 依存方向とクライアント／サーバー境界の検査 |
| `npm run test`              | 全パッケージのテストを実行                 |
| `npm run build`             | 全パッケージをビルド                       |

## ドキュメント

- [開発手順](DEVELOPMENT.md)
- [ウェブサイトの構成と検証](packages/website/README.md)
