# 開発手順

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
