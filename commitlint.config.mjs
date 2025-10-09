// commitlint.config.mjs

const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'website',
        'eslint-config',
        'prettier-config',
        'root',
        '*',
      ],
    ],
    'scope-empty': [2, 'never'], // スコープを必須に
    'scope-case': [2, 'always', 'kebab-case'],
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新機能
        'fix',      // バグ修正
        'docs',     // ドキュメントのみの変更
        'style',    // コードの意味に影響しない変更（空白、フォーマット等）
        'refactor', // リファクタリング
        'perf',     // パフォーマンス改善
        'test',     // テストの追加・修正
        'chore',    // ビルドプロセスやツールの変更
        'ci',       // CI設定ファイルの変更
        'revert',   // コミットの取り消し
      ],
    ],
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(.+?)\] (\w+): (.+)$/,
      headerCorrespondence: ['scope', 'type', 'subject'],
    },
  },
};

export default config
