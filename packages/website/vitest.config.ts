import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    reporters: process.env.CI ? ['default', 'junit'] : ['default'],
    outputFile: { junit: 'reports/vitest-junit.xml' },

    // テスト環境
    environment: 'jsdom',
    // Use jsdom's per-window storage instead of Node.js 26's native Web Storage.
    execArgv: ['--no-experimental-webstorage'],

    // セットアップファイル
    setupFiles: ['./src/testing/vitest.setup.tsx'],

    // グローバルAPI（describe, it, expect など）を自動インポート
    globals: true,

    // カバレッジ設定
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      reporter: ['text', 'json', 'json-summary', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        // 設定ファイル
        '**/*.config.{ts,js,mjs,cjs}',
        '**/*.d.ts',
        '**/types/',
        '**/*.stories.{ts,tsx}',
        '**/e2e/**',
        // Lint 設定
        '.textlintrc.mjs',
        'commitlint.config.mjs',
        // shadcn/ui コンポーネント（サードパーティ）
        'src/components/ui/**',
        // 設定ファイル
        'src/config/**',
        // プロバイダーラッパー
        'src/providers/**',
        // ページ・レイアウトコンポーネント（E2E でカバー）
        'src/app/**/page.tsx',
        'src/app/**/layout.tsx',
        'src/app/**/loading.tsx',
        'src/app/**/error.tsx',
        'src/app/**/not-found.tsx',
        // 機能コンポーネント（UI 重点）
        'src/features/**/components/**',
        // ページ固有コンポーネント（E2E でカバー）
        'src/app/**/_components/**',
        // テスト関連
        'src/testing/**',
        // ユーティリティのエクスポートファイル
        '**/index.ts',
        '**/index.tsx',
        // OpenGraph 画像生成（SSR 専用）
        'src/components/OpenGraphImage.tsx',
        // ラッパーコンポーネント
        'src/components/AxiomWebVitalsWrapper.tsx',
        'src/components/Frame.tsx',
        'src/components/ThemeToggle.tsx',
        // Next.js メタデータ・設定ファイル
        'src/app/manifest.ts',
        'src/app/robots.ts',
        'src/app/sitemap.ts',
        'src/app/global-error.tsx',
        'src/app/api/og/**',
        // Instrumentation
        'src/instrumentation.ts',
        // Logger（モック困難な外部連携）
        'src/lib/logger.ts',
        // Sentry 設定
        'sentry.*.ts',
        'src/sentry*.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },

    // タイムアウト設定
    testTimeout: 10000,
    hookTimeout: 10000,

    // 並列実行
    pool: 'threads',

    include: ['**/__tests__/**/*.{test,spec}.{ts,tsx}', '**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.next', 'e2e'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
