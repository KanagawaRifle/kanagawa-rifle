import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import { withAxiom } from 'next-axiom';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Sentry用にソースマップを生成（Sentryアップロード後に削除される）
  productionBrowserSourceMaps: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.kanagawa-rifle.org',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],

  // セキュリティヘッダー
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';

    // Vercel環境かどうか
    const isVercel = !!process.env.VERCEL;

    // CSP ディレクティブ（外部サービス対応）
    const cspDirectives = [
      "default-src 'self'",
      // Vercel環境ではプレビュー機能用に vercel.live を許可
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.clarity.ms https://*.sentry.io${isVercel ? ' https://vercel.live' : ''}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://static.kanagawa-rifle.org https://www.googletagmanager.com https://*.clarity.ms",
      "font-src 'self' https://fonts.gstatic.com",
      // kanagawa-rifle.org のサブドメイン（staging含む）を許可、開発環境では localhost も許可
      `connect-src 'self' https://*.kanagawa-rifle.org https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.clarity.ms https://*.sentry.io https://static.kanagawa-rifle.org${isDev ? ' http://localhost:* ws://localhost:* wss://localhost:*' : ''}${isVercel ? ' https://vercel.live wss://ws-us3.pusher.com' : ''}`,
      `frame-src 'self' https://www.google.com https://docs.google.com${isVercel ? ' https://vercel.live' : ''}`,
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://docs.google.com",
      "frame-ancestors 'none'",
      // 開発環境では upgrade-insecure-requests を無効化
      ...(isDev ? [] : ['upgrade-insecure-requests']),
    ];

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: cspDirectives.join('; ') },
        ],
      },
    ];
  },
};

export default withSentryConfig(withAxiom(bundleAnalyzer(nextConfig)), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  automaticVercelMonitors: true,

  bundleSizeOptimizations: {
    excludeDebugStatements: true,
    excludeReplayIframe: true,
    excludeReplayShadowDom: true,
    excludeReplayWorker: true,
  },

  // ソースマップ設定
  sourcemaps: {
    // ソースマップを削除してクライアントに公開しない
    deleteSourcemapsAfterUpload: true,
  },
});
