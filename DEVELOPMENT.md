# 開発手順

## ローカル環境

Node.js 26.13.0 / npm 12.2.1 を使います。Volta を使うと、ルートの `package.json` に指定した
バージョンが選択されます。以下のコマンドはリポジトリのルートで実行してください。

```bash
npm ci
# 初回のみ。既存の設定は上書きしない
[ -f packages/website/.env.local ] || cp packages/website/.env.example packages/website/.env.local
npm run dev
```

開発 URL は `http://localhost:3000` です。`make setup` でも環境ファイルの作成、依存関係の
インストール、環境診断を実行できます。環境の確認だけなら `npm run doctor` を使います。

Docker の起動手順は [README](README.md#クイックスタート) を参照してください。
VS Code の Dev Containers にも対応しています。ホストとコンテナーは `node_modules` や `.next` を
共有するため、インストール・ビルド・開発サーバーを同時に実行しないでください。

MinIO はイメージの取得に失敗するため利用できません（2026-09-24 確認）。
サイトの開発には `node` と `https-portal` を起動してください。

## 検証

`npm run check` で型、lint、API・環境変数、依存関係、ライセンス、検査スクリプトを確認します。
`npm run qa` はこれに本番ビルド、サイズ検査、単体テストのカバレッジ、Storybook テスト、`npm audit --audit-level=high` を加えます。

```bash
npm run check
npm run test:coverage
npm run -w @acme/website test:content
npm run build
```

カバレッジの下限は行・関数・分岐・ステートメントの各 80% です。
記事の更新手順と構成は [website README](packages/website/README.md) を参照してください。

### ブラウザと Storybook

```bash
npx playwright install chromium
npm run -w @acme/website test:e2e:dev -- --project=chromium --project="Mobile Chrome"
LHCI=1 npm run -w @acme/website test:e2e -- --project=chromium --project="Mobile Chrome"
npm run -w @acme/website test:storybook
```

Storybook は Vite 版の Next.js 設定を使い、公式の Vitest plugin と Playwright の Chromium でストーリーを検証します。
`test:storybook` は静的ビルドも検証し、`test-storybook` はストーリーのテストだけを実行します。
アクセシビリティ違反は失敗として扱い、JUnit を `packages/website/reports/storybook/storybook.xml` に保存します。
Playwright がサーバーを起動します。`test:e2e` は本番ビルドを `127.0.0.1:3100` で、
`test:e2e:dev` は開発サーバーを `127.0.0.1:3200` で検証します。実行前に手動の開発サーバーを停止してください。
`LHCI=1` はローカル HTTP 用に CSP の HTTPS 強制を無効にする設定で、ビルドと起動の両方に必要です。

### 個別の検査

| コマンド                                     | 用途                                                                                    |
| -------------------------------------------- | --------------------------------------------------------------------------------------- |
| `npm run lint:architecture`                  | 循環参照、依存方向、クライアント／サーバー境界                                          |
| `npm run contracts:check`                    | OpenAPI の構造・ルート一覧、環境変数の宣言                                              |
| `npm run graph`                              | 依存関係を Mermaid 形式で標準出力へ表示                                                 |
| `npm run lint:markdown`                      | 記事内の Markdown 参照の欠落・重複                                                      |
| `npm run syncpack`                           | ワークスペース間の依存バージョン                                                        |
| `npm run knip`                               | 未使用ファイル・依存・エクスポート                                                      |
| `npm run cspell`                             | 文書・スクリプト・サイトのスペル。固有名詞は `packages/website/.cspell.dict.txt` に登録 |
| `npm run license-check`                      | 依存パッケージのライセンス                                                              |
| `npm run coverage:diff -- --base origin/2.x` | 指定コミットからの変更行のカバレッジ                                                    |
| `npm run size-limit`                         | ビルド済みページの初期 JS/CSS/HTML サイズ。gzip で 225 kB / 20 kB / 50 kB が上限        |
| `npm run -w @acme/website test:mutation`     | ニュース入力スキーマのミューテーションテスト。スコア 95% 未満で失敗                     |
| `npm run -w @acme/website analyze`           | Webpack のバンドル分析                                                                  |
| `npm run lint:infra`                         | Docker で ShellCheck・actionlint・Hadolint・zizmor を実行                               |

`coverage:diff` はコミット間の比較です。checkout と同じコミットで生成したカバレッジの JSON レポートを使います。

ルートの `lint:text` は開発文書の日本語と英語の間のスペースを検査します。
記事の文章表現は `npm run -w @acme/website lint:text` で検査できます。
大会名の連続漢字やリンクだけの段落など、過去記事にも指摘が残るため、この検査は任意です。

## パッケージ管理

依存関係は利用するワークスペースへ追加します。

```bash
npm install -w @acme/website <package-name>
npm install -D -w @acme/website <package-name>
```

ルートの `package-lock.json` もコミットしてください。共有設定を変更した場合は、
ルートで `npm run check`、`npm run test`、`npm run build` を実行して利用側を確認します。

本番依存のライセンス全文は `npm run license-report` で `packages/website/THIRD-PARTY-LICENSES.txt` に、
SBOM は `npm run --silent sbom > bom.json` で出力できます。生成したレポートは Git の管理対象外です。

ルートの `overrides` は、親パッケージが古いバージョンを固定している推移依存の修正に使っています。
KaTeX、postcss-selector-parser、ライセンス生成ツールの Zod、typed-rest-client の qs は対象の親に限定しています。
`generate-license-file` は 4.2 系でワークスペースの依存収集に欠落があるため 4.1.1 を維持し、
Zod のみ更新しています。4.2.5 でも本番依存 19 件の欠落を確認しました（2026-11-05）。
更新時は `npm run license-report` で本番依存の収録も確認してください。

`npm run typecheck` は npm alias `typescript-native` の TypeScript 7.0.2 を明示的に実行します。
JavaScript API を使う ESLint・検査スクリプト・Next.js のビルド内の型検査には、
公式の互換パッケージ `@typescript/typescript6` を `typescript` として導入しています。
Vercel は `packages/website` から `npm ci` を実行するため、ルートだけにある開発依存は入りません。
ビルド用の互換パッケージと型検査用の CLI を website に宣言し、CI のブラウザ検査も同じインストール範囲で実行します。
`@vitest/eslint-plugin` も TypeScript 6 対応の 1.6.28 に更新しています。
hoist された `remark-github-blockquote-alert` の型宣言が unified 11 を解決できるよう、
ルートにも同じバージョンの `unified` を指定しています。

Stylelint は 17.16.0、`stylelint-config-standard` は 40.0.0 を使用します。
最新の `stylelint-config-standard-scss` 17.0.0 が Stylelint 18 に未対応で、
削除されたルールによるエラーになるためです。設定側の対応後にまとめて更新してください。

既存の `.npmrc` は `legacy-peer-deps=true` を指定しています。
`eslint-plugin-import` など一部の peer dependency 宣言は ESLint 10 に未対応です。
インストールの成功だけで互換性を判断せず、lint・型・ビルド・テストを確認してください。

npm 12 は依存パッケージのインストールスクリプトを既定で実行しません。
ルートの `package.json` の `allowScripts` で、esbuild、Snyk のインストール処理を
バージョン指定で許可しています。これらの依存を更新した場合は `npm install-scripts ls` で確認し、
必要な処理を確認してから `npm install-scripts approve <package-name>` で許可対象を更新してください。
その後 `npm ci` を実行し、インストールスクリプトの未許可警告が残らないことを確認します。

jsdom を使う単体テストでは、Vitest の `execArgv` に `--no-experimental-webstorage` を指定しています。
Node.js 26 のネイティブ Web Storage と衝突せず、jsdom のウィンドウごとのストレージで検証するためです。

Sentry 11 への更新では、`src/config/sentry.ts` の共有設定で従来のデータ収集範囲と
静的なトレースのライフサイクルを維持しています。ブラウザ・サーバー・Edge の初期化で共通に読み込みます。
ビルド依存の CLI は `@sentry/cli` から `sentry` に変わりました。未改変のビルドツールとして使い、
[FSL-1.1-Apache-2.0](https://github.com/getsentry/cli/blob/main/LICENSE.md) のライセンス全文を保持します。
`.licensee.json` の例外は確認済みの `sentry@0.45.0` に限定しています。
argparse の [PSF-2.0](https://spdx.org/licenses/PSF-2.0.html) もライセンス全文を確認し、許可一覧に追加しています。

2026-11-04 の更新で、`npm audit` の全 severity と `--omit=dev` の検出を 0 件にしました。
glob 9〜13 系は 14.0.3、minimatch 9〜10 系は 11.0.4 に更新しています。
修正対象は [glob の中断処理](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4) と
[minimatch のパターン増幅](https://github.com/advisories/GHSA-g3hv-75wg-m249) です。

旧 API を使う ESLint 系依存には `packages/minimatch-compat` を適用します。
ルートの `minimatch` はこのローカルパッケージを指し、`minimatch@<9` の override は `$minimatch` を参照します。
このエントリーは新 API 向け override より先に置きます。npm がローカルの直接依存と同じ置換先を選ぶために必要です。
実際の解析・照合は npm alias `minimatch-v11` が参照する公式の修正版に委譲し、旧版の実装は含みません。
旧 CommonJS の関数形式と `Minimatch` を提供し、`makeRe()` は `eslint-plugin-import` が使う `.test()` のみ対応します。
正規表現の生成、`.source`、`.exec()` との互換性はありません。利用する親パッケージの更新時には API の使用箇所を確認してください。
アダプターの挙動とパターン増幅の上限は `npm run -w @acme/minimatch-compat test` で検証します。

[修正版のない deepmerge](https://github.com/advisories/GHSA-gcqx-w48m-w2h4) は、Storybook の旧 Jest ベースの
test-runner を [公式の Vitest 連携](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon/migration-guide) に移行して依存ごと除去しました。
更新時は監査に加え、lint、単体テスト、ビルド、Storybook、ミューテーションテスト、ライセンス生成を確認してください。

## CI と公開

`CI Required` は品質検査、ブラウザ・Storybook テスト、インフラ検査の結果を集約します。
カバレッジ、SBOM、ライセンス全文は Actions の artifact、Lighthouse はジョブの summary と artifact に出力します。
OSV、Gitleaks とソースコード・依存関係のセキュリティ検査も実行します。
GitHub Free の非公開リポジトリでは、Actions のリポジトリ変数 `CODE_SECURITY_ENABLED=false` を設定します。
未設定時も同じ構成です。固定した Semgrep とコミュニティのセキュリティルールで JavaScript / TypeScript を解析し、
`npm audit --audit-level=low` とライセンス検査を実行します。脆弱性や解析の指摘は CI の失敗として扱います。
Semgrep は外部への計測送信を無効にし、解析結果を Actions の artifact に保存します。
解析対象はアプリと運用ツールです。テストの入力例と Storybook の展示コードは対象外です。
OSV は全依存を検査し、PR の差分結果も artifact に残します。

public リポジトリでは、変数の値にかかわらず CodeQL と Dependency Review API を使用し、
OSV と Scorecard の結果も Code Scanning に登録します。可視性の変更後、次のワークフロー実行から切り替わります。
private リポジトリで同じ機能を使う場合のみ、GitHub Code Security の契約と有効化を確認して
`CODE_SECURITY_ENABLED=true` に変更してください。利用できない private 環境では代替検査と artifact の保存を継続します。
依存関係グラフ、Dependabot alerts、Dependabot security updates はどちらの構成でも有効にします。

記事向けの不適切表現チェックは、辞書を内蔵する `ja-no-inappropriate-words` に統一しています。
古い XML パーサーと外部 HTTP 辞書に依存する `no-hoso-kinshi-yogo` は利用しません。

Dependabot はワークスペースの依存をまとめて更新します。更新内容を確認して承認した後、
本人のアカウントで PR の `Enable auto-merge` を選ぶと、GitHub が必須検査の成功後に rebase merge します。
開発依存と Actions の minor / patch 更新でも承認は省略しません。本番依存と major 更新は特に内容を確認してください。
自動マージの予約は PR ごとに行います。Dependabot の PR であることだけを理由に予約するワークフローはありません。
GitHub Actions のトークンはマージ許可対象に含めず、本人と Dependabot の制限を維持します。
ラベルは `.github/labels.yml` で定義し、`Sync Labels` の手動実行で作成・更新します。
公開時は [公開前の確認](.github/PRE_RELEASE_CHECKLIST.md) を使ってください。

## リンクと公開後の確認

リンク検査は本番ビルドが出力した記事 HTML を使います。記事を変更した場合は先に再ビルドしてください。
ローカルでは [lychee 0.24.2](https://lychee.cli.rs/installation/) を PATH に置くか、`LYCHEE_BIN` に実行ファイルを指定します。

```bash
npm run build
npm run lint:links
npm run -w @acme/website lint:links:external
SMOKE_BASE_URL=https://kanagawa-rifle.org npm run -w @acme/website test:deployment
```

外部リンクには相手サイトの認証・アクセス制限などで検査できないものがあります。
`Content Links` は PR で内部リンクを検査し、定期・手動実行では外部リンクの結果もレポートに残します。
デプロイ確認は指定した origin だけにアクセスします。認証が必要なプレビュー環境には対応していません。

## 性能・負荷の確認

Lighthouse の使い方は [共有設定の README](packages/lighthouse-config/README.md) を参照してください。
起動済みサーバーのブラウザ計測は、次のように URL と測定回数を指定します。

```bash
npm run -w @acme/website benchmark:browser -- http://127.0.0.1:3000 3
npm run -w @acme/website test:load:smoke
```

k6 は Docker の固定イメージ、または `K6_BINARY` で指定した実行ファイルを使います。
smoke はローカルの本番サーバーを起動し、1 ユーザー・5 回でニュース API を検査します。
Docker 実行は host ネットワークを使います。Docker Desktop では host networking を有効にするか、ローカルの k6 を使用してください。

負荷試験の対象と条件はすべて指定します。対象環境の管理者と実施条件を確認してから実行してください。

```bash
WEBSITE_LOAD_BASE_URL=https://preview.example.test \
WEBSITE_LOAD_RATE=2 WEBSITE_LOAD_DURATION=30s WEBSITE_LOAD_VUS=3 WEBSITE_LOAD_P95_MS=500 \
npm run -w @acme/website test:load
```

ステージングの Basic 認証には `WEBSITE_PREVIEW_AUTH=1`、`BASIC_AUTH_ID`、`BASIC_AUTH_PASSWORD` を設定します。
値をコマンド履歴へ残さず、環境変数として渡してください。

## GitHub の運用補助

コミットと PR タイトルは Conventional Commits の `type(scope): summary` に統一します。
scope は省略でき、`fix(website): correct article links`、`docs: update development guide`、
`feat(website)!: change the news API` の形式を使えます。ヘッダーは 100 文字以内にしてください。
Dependabot も npm は `chore(deps)`、Actions は `ci(deps)`、Docker は `build(deps)` の形式を使います。
開発依存では scope が `deps-dev` になります。

PR は rebase merge のみ許可し、個々のコミットを残して直線的な履歴を維持します。
必須チェック `PR Messages` は、PR タイトルと PR に含まれる全コミットのメッセージを検査します。
Git の完全な履歴から PR の base / head 間を読み、イベントのコミット数と一致することも確認します。
空メッセージ、バージョン番号だけのメッセージ、通常の Merge / Revert メッセージも検査を省略しません。
違反した場合はタイトルを編集するか、`git commit --amend` / `git rebase -i` で該当コミットを修正します。
タイトルの変更や正常なコミットの追加だけでは、過去の違反コミットは修正されません。
作業途中の修正はマージ前に意味のある単位へ整理し、最新の既定ブランチへの追従も rebase で行ってください。

JUnit のテスト結果は `Test Report`、リポジトリの検査は `Scorecard` に出力します。
終了した同一リポジトリの PR のキャッシュは `Cache Cleanup` が削除します。
`Stale Issues` と `Lock Threads` は手動実行です。Stale はラベルを付けるだけで、自動では閉じません。

<!-- cspell:words sasakiuri -->

既定ブランチの保護は `.github/branch-ruleset.json`、`branch-mergers-ruleset.json`、
`branch-owner-review-ruleset.json` の 3 つで管理します。次のコマンドは適用予定の JSON を表示するだけです。

```bash
node scripts/setup-branch-protection.mjs
```

管理者が内容を確認して適用する場合は `--apply --repo KanagawaRifle/kanagawa-rifle` を付けます。
GitHub CLI の認証と管理権限が必要です。同名の ruleset があれば更新し、ほかの ruleset は削除しません。
現在のブランチ設定と競合しないか確認してください。

基本の ruleset は全員に PR、`CI Required` と `PR Messages`、会話の解決、rebase merge を要求し、削除と force push を禁止します。
GitHub のリポジトリ設定も rebase merge だけを有効にし、squash merge と merge commit を無効にします。
マージできるのは `sasakiuri`（ユーザー ID `34340317`）と Dependabot（App ID `29110`）だけです。
別のレビュー ruleset で `CODEOWNERS` の承認を必須にしており、Dependabot がマージする場合も承認が必要です。
全ファイルと `CODEOWNERS` 自体の所有者は `sasakiuri` です。承認後に変更が追加された場合は承認を取り消します。
本人だけは PR のマージ時にレビュー条件を省略できるため、自分で作成した PR に他人の承認を要求しません。
この例外は CI や直接 push の禁止には適用されません。レビューの取り消しも本人だけに制限しています。
参加者を増やす場合も、所有者・マージ許可・レビュー例外を不用意に増やさないでください。

GitHub Free の private リポジトリではブランチ保護の適用が 403 になる場合があります。
public に変更する場合は、事前に表示した設定を確認し、変更直後に適用して GitHub 側の結果を確認してください。
このスクリプトはリポジトリの可視性を変更しません。公開前後の手順は
[公開前の確認](.github/PRE_RELEASE_CHECKLIST.md) を参照してください。
