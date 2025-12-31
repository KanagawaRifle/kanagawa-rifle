# 開発手順

## 開発環境

### kanagawa-rifle/website

開発サーバー
```bash
npm run -w @acme/website dev
```

Format
```bash
npm run -w @acme/website fix
```

ビルド
```bash
npm run -w @acme/website build
```

## パッケージ管理

### npm

#### ワークスペースの追加

ルートの package.json の workspaces にパスを追加する。

```json
{
  "workspaces": [
    "packages/<ワークスペース名>"
  ]
}
```
#### ワークスペースへのパッケージの追加

```shell
npm i -w <ワークスペース名> [<ワークスペース名>] <パッケージ名>
```

全ワークスペースにインストールする場合は `-ws` オプションを利用する。

### ワークスペースの npm スクリプトの実行

```shell
npm run -w <ワークスペース名> <スクリプト名>
```

## Composer

### モノレポパッケージにパッケージを追加

```shell
composer require --dev -d <モノレポパッケージのパス> <パッケージ名>
```

### 依存関係のマージ

```shell
composer monorepo merge
```
