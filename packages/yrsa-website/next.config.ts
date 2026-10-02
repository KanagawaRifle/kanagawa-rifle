import { fileURLToPath } from 'node:url';

import { toolingWorkspaceRoot } from '@sasakiuri/repo-tooling/runtime';
import type { NextConfig } from 'next';

/**
 * Security headers for the application
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/headers
 */
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: toolingWorkspaceRoot(fileURLToPath(new URL('.', import.meta.url))),
  },
  // API ルートを動的に動作させるため output: "export" は使用しない
  // ページは generateStaticParams で静的生成される
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

const config = async () => {
  if (process.env.ANALYZE === 'true') {
    const bundleAnalyzer = (await import('@next/bundle-analyzer' as string)).default as (options: {
      enabled: boolean;
    }) => (config: NextConfig) => NextConfig;
    return bundleAnalyzer({ enabled: true })(nextConfig);
  }
  return nextConfig;
};

export default config;
