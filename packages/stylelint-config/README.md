# Stylelint 共有設定

`@acme/stylelint-config` は Stylelint 17 の標準 CSS/SCSS ルールとプロパティ順をまとめます。
利用側では `extends: ['@acme/stylelint-config']` を指定し、Stylelint を開発依存に追加します。

Tailwind CSS 4 のディレクティブやサイト固有の表記は
[website の設定](../website/stylelint.config.mjs) で補います。
検証は `npm run -w @acme/website lint:styles`、修正は `fix:styles` です。
