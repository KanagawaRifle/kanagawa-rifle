// packages/lighthouse-config/index.js

const config = {
  ci: {
    collect: {
      numberOfRuns: 3,
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
      assertions: {
        // カテゴリスコア
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        // best-practices は localhost テスト環境での CSP 偽陽性により 0.96 まで許容
        'categories:best-practices': ['error', { minScore: 0.96 }],
        'categories:seo': ['error', { minScore: 1.0 }],

        // 明示した品質項目を検査し、性能の診断項目は上のカテゴリスコアで評価する。
        'errors-in-console': ['error', { minScore: 1 }],
        'http-status-code': ['error', { minScore: 1 }],
        'document-title': ['error', { minScore: 1 }],
        'html-has-lang': ['error', { minScore: 1 }],
        'image-alt': ['error', { minScore: 1 }],
        'link-name': ['error', { minScore: 1 }],
        'meta-viewport': ['error', { minScore: 1 }],
      },
    },
  },
};

export default config;
