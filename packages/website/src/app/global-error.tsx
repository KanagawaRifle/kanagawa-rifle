'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ja">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
          <h1 className="text-2xl font-bold">エラーが発生しました</h1>
          <p className="text-muted-foreground">申し訳ございません。予期しないエラーが発生しました。</p>
          <button onClick={reset} className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
            再試行
          </button>
        </div>
      </body>
    </html>
  );
}
