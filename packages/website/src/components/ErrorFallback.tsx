// packages/website/src/components/ErrorFallback.tsx

import { RefreshCcw } from 'lucide-react';
import { FallbackProps } from 'react-error-boundary';

import { Button } from '@/components/ui/button';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center gap-4"
      role="alert"
      aria-live="assertive"
    >
      <h2 className="text-xl font-semibold text-destructive">エラーが発生しました (T_T)</h2>
      {process.env.NODE_ENV === 'development' && error?.message && (
        <pre className="max-w-md overflow-auto whitespace-pre-wrap break-words rounded bg-muted p-2 text-sm">
          {error.message}
        </pre>
      )}
      <Button variant="outline" onClick={resetErrorBoundary} className="text-destructive border-destructive">
        <RefreshCcw className="mr-2 h-4 w-4" />
        更新
      </Button>
    </div>
  );
}
