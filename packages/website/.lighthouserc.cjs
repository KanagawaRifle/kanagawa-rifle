// packages/website/.lighthouserc.cjs

/* eslint-disable @typescript-eslint/no-require-imports */
const base = require('@acme/lighthouse-config').default;

// GitHub Actions からの実行かどうかを判定
const isCI = process.env.CI === 'true';

const chromeFlags = [
  '--headless',
  '--disable-gpu',
  '--no-sandbox',
  '--disable-dev-shm-usage',
  '--disable-software-rasterizer',
];

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
        'http://localhost:3000/news',
        'http://localhost:3000/news/2026-09-24-01',
        'http://localhost:3000/forms',
        'http://localhost:3000/join',
        'http://localhost:3000/links',
        'http://localhost:3000/projects',
        'http://localhost:3000/recommendation',
      ],
      // CI 環境ではワークスペースコマンド、ローカルでは通常コマンドを使用
      // LHCI=true で CSP を localhost 用に緩和
      startServerCommand: isCI
        ? 'LHCI=true npm run -w @acme/website start'
        : 'LHCI=true npm run start',
      startServerReadyPattern: 'Ready in',
      startServerReadyTimeout: 60000,
      // CI 環境では Chrome パスを指定しない（treosh/lighthouse-ci-action が管理）
      ...(isCI ? {} : { chromePath: process.env.CHROME_PATH || '/usr/bin/chromium' }),
      chromeFlags,
      // Lighthouse 設定に直接フラグを渡す
      settings: {
        chromeFlags: chromeFlags.join(' '),
      },
    },
  },
};
