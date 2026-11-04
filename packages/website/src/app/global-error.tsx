'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

// The root error replaces the layout. Keep its small stylesheet self-contained
// so the fallback remains styled even when the layout cannot render.
const errorStyles = `
  .global-error { margin: 0; font-family: 'Noto Sans CJK JP', 'Hiragino Sans', 'Noto Sans JP', 'Yu Gothic', system-ui, sans-serif; font-size: 14px; line-height: 1.8; color: oklch(19.08% 0.002 106.59); background: oklch(98.18% 0.005 95.1); }
  .global-error > div { box-sizing: border-box; display: flex; min-height: 100vh; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; padding: 1rem; }
  .global-error h1 { margin: 0; font-size: 1.5rem; font-weight: 700; line-height: 1.33; }
  .global-error p { margin: 0; color: oklch(40% 0.003 106.59); }
  .global-error button { border: 0; border-radius: 0.25rem; padding: 0.5rem 1rem; font: inherit; color: oklch(98% 0.01 148.04); background: oklch(47.63% 0.13 148.04); }
  .global-error button:hover { background: oklch(47.63% 0.13 148.04 / 90%); }
  @media (min-width: 768px) { .global-error { font-size: 16px; } }
`;

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ja">
      <head>
        <style>{errorStyles}</style>
      </head>
      <body className="global-error">
        <div>
          <h1>エラーが発生しました</h1>
          <p>申し訳ございません。予期しないエラーが発生しました。</p>
          <button type="button" onClick={reset}>
            再試行
          </button>
        </div>
      </body>
    </html>
  );
}
