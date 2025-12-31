# kanagawa-rifle

特定非営利活動法人 神奈川県ライフル射撃協会の公式ウェブサイト

## クイックスタート

```bash
# リポジトリをクローン
git clone https://github.com/kanagawa-rifle/kanagawa-rifle.git
cd kanagawa-rifle

# Docker で開発環境を起動
cd docker && docker compose up -d

# 依存関係をインストール
docker exec kanagawa-rifle_node npm install

# 開発サーバーを起動
docker exec kanagawa-rifle_node npm run -w @acme/website dev
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

| コマンド | 説明 |
|----------|------|
| `npm run lint` | 全パッケージの lint を実行 |
| `npm run test` | 全パッケージのテストを実行 |
| `npm run build` | 全パッケージをビルド |

## ドキュメント

- [開発手順](DEVELOPMENT.md)
- [Claude Code ガイド](CLAUDE.md)
