// packages/website/.lighthouserc.cjs

/* eslint-disable @typescript-eslint/no-require-imports */
const base = require('@kanagawa-rifle/lighthouse-config').default;

// GitHub Actions からの実行かどうかを判定
const isCI = process.env.CI === 'true';

module.exports = {
  ...base,
  ci: {
    ...base.ci,
    collect: {
      ...base.ci.collect,
      url: [
        'http://localhost:3000',
        'http://localhost:3000/about',
        'http://localhost:3000/competitions',
        'http://localhost:3000/forms',
        'http://localhost:3000/join',
        'http://localhost:3000/links',
        'http://localhost:3000/projects',
        'http://localhost:3000/recommendation',
      ],
      // CI 環境ではワークスペースコマンド、ローカルでは通常コマンドを使用
      startServerCommand: isCI
        ? 'npm run -w @kanagawa-rifle/website start'
        : 'npm run start',
      startServerReadyPattern: 'Ready in',
      startServerReadyTimeout: 60000,
      // CI 環境では Chrome パスを指定しない（treosh/lighthouse-ci-action が管理）
      ...(isCI ? {} : { chromePath: process.env.CHROME_PATH || '/usr/bin/chromium' }),
      chromeFlags: [
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
      ],
    },
  },
};
