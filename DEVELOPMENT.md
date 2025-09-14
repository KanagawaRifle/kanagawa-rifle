# 開発手順

## 開発環境

### kanagawa-rifle/website

開発サーバー
```bash
npm run dev -w @kanagawa-rifle/website
```

Format
```bash
cd packages/website && npx next lint --fix
```

SSG
```bash
npm run export -w @kanagawa-rifle/website
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
