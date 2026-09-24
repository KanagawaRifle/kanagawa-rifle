# TypeScript 共有設定

`base.json` は strict、未検査の添字アクセス、return、switch のチェックを有効にします。
`nextjs.json` は Next.js 用の JSX と言語サービスを追加します。
利用側の `tsconfig.json` で `extends: '@acme/typescript-config/nextjs.json'` を指定し、
alias と検査対象ファイルは利用側で定義します。
