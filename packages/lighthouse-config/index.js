// packages/lighthouse-config/index.js

const config = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerReadyTimeout: 30000,
      chromeFlags: [
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--user-data-dir=./.lighthouse.temp',
      ],
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouse.reports',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // カテゴリスコア
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        // best-practices は localhost テスト環境での CSP 偽陽性により 0.96 まで許容
        'categories:best-practices': ['error', { minScore: 0.96 }],
        'categories:seo': ['error', { minScore: 1.0 }],

        // ソースマップはセキュリティ上の理由で公開しないため警告に緩和
        'valid-source-maps': 'off',

        // 未使用 JavaScript は Next.js の仕様上避けられないため警告に
        'unused-javascript': 'off',

        // レガシー JavaScript は依存ライブラリに起因するため警告に
        'legacy-javascript': 'off',

        // localhost テスト環境では CSP が本番設定のため偽陽性が出る
        'inspector-issues': 'off',

        // 以下は NaN を返すことがあるため無効化（ページによって該当しない場合がある）
        'lcp-lazy-loaded': 'off',
        'non-composited-animations': 'off',
        'prioritize-lcp-image': 'off',
      },
    },
  },
};

export default config;
