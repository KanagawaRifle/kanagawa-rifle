type SecurityOptions = {
  isDev: boolean;
  isVercel: boolean;
  isLhci: boolean;
  assetOrigins: string[];
};

export function createSecurityHeaders({ isDev, isVercel, isLhci, assetOrigins }: SecurityOptions) {
  // localhost を許可するかどうか（開発環境または Lighthouse CI テスト環境）
  const allowLocalhost = isDev || isLhci;

  // CSP ディレクティブ（外部サービス対応）
  const cspDirectives = [
    "default-src 'self'",
    // React の開発用デバッグ機能だけに eval を許可する。LHCI を含む本番ビルドでは禁止。
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://*.clarity.ms https://*.sentry.io${isVercel ? ' https://vercel.live' : ''}`,
    // Note: next/font 使用によりフォントはセルフホスティング
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${assetOrigins.join(' ')} https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com`,
    "font-src 'self'",
    // Sentry Session Replay compresses recordings in a Blob-backed worker.
    "worker-src 'self' blob:",
    // kanagawa-rifle.org のサブドメイン（staging含む）を許可、開発環境または LHCI 環境では localhost も許可
    `connect-src 'self' https://*.kanagawa-rifle.org https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.clarity.ms https://*.sentry.io ${assetOrigins.join(' ')}${allowLocalhost ? ' http://localhost:* ws://localhost:* wss://localhost:*' : ''}${isVercel ? ' https://vercel.live wss://ws-us3.pusher.com' : ''}`,
    `frame-src 'self' https://www.google.com https://docs.google.com${isVercel ? ' https://vercel.live' : ''}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://docs.google.com",
    "frame-ancestors 'none'",
    // 開発環境および LHCI 環境では upgrade-insecure-requests を無効化
    ...(allowLocalhost ? [] : ['upgrade-insecure-requests']),
  ];

  return [
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    { key: 'Content-Security-Policy', value: cspDirectives.join('; ') },
  ];
}
