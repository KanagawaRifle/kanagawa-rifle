import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs/config';
import type { NextConfig } from 'next';
import { withAxiom } from 'next-axiom';

import { env } from './src/config/env';
import { createSecurityHeaders } from './src/config/security-headers';
import { isPreviewDeployment } from './src/config/seo';

const assetUrls = [new URL(env.CDN_URL), new URL(env.STATIC_FILE_BASE_URL)];

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Inline an empty public DSN even when the variable is absent, so the browser
  // build can remove disabled monitoring instead of retaining a runtime lookup.
  env: { NEXT_PUBLIC_SENTRY_DSN: env.SENTRY_DSN ?? '' },

  // Sentry用にソースマップを生成（Sentryアップロード後に削除される）
  productionBrowserSourceMaps: true,

  images: {
    remotePatterns: assetUrls.map((url) => ({
      protocol: url.protocol === 'http:' ? 'http' : 'https',
      hostname: url.hostname,
      port: url.port,
      pathname: '/**',
    })),
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],

  // セキュリティヘッダー
  async headers() {
    return [
      {
        source: '/api/news/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      ...(isPreviewDeployment() ? [{ source: '/(.*)', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] }] : []),
      {
        source: '/(.*)',
        headers: createSecurityHeaders({
          isDev: process.env.NODE_ENV === 'development',
          isVercel: !!process.env.VERCEL,
          isLhci: !!process.env.LHCI,
          assetOrigins: assetUrls.map((url) => url.origin),
        }),
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

  webpack: {
    treeshake: { removeDebugLogging: true },
    automaticVercelMonitors: true,
  },

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
