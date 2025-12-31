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
        '--user-data-dir=./.lighthouse.temp'
      ]
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouse.reports',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};

export default config;
