# 開発ツールの出典

共有設定、検査スクリプト、開発環境、GitHub テンプレートとワークフローの一部に
[sasakiuri/oss](https://github.com/sasakiuri/oss) のコードを使用しています。
著作権表示と MIT ライセンス全文は [licenses/oss-MIT.txt](licenses/oss-MIT.txt) にあります。

依存パッケージには、それぞれのライセンスが適用されます。
`npm run license-check` はインストール済みパッケージを `.licensee.json` と照合します。

`.licensee.json` のバージョン指定による例外は、メタデータを認識できない
`boundary`（BSD-2-Clause）、`structured-source`（BSD-2-Clause）、`tiny-segmenter`（BSD-3-Clause）、
`zlibjs`（MIT）、`parse-cache-control`（BSD-3-Clause）と、既存依存の `domain-browser`（Artistic-2.0）です。
各パッケージの配布ファイル内のライセンス表示を保持します。
