// packages/website/src/providers/QueryProvider.tsx

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@/components';
import { queryConfig } from '@/lib/ReactQuery';

function createQueryClient() {
  return new QueryClient({
    defaultOptions: queryConfig,
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: 常に新しいクライアントを作成
    return createQueryClient();
  } else {
    // Browser: 既存のクライアントを再利用するか、なければ新しく作成
    browserQueryClient ??= createQueryClient();
    return browserQueryClient;
  }
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());

  // ローカル環境（開発環境）では ErrorBoundary を使わない
  if (process.env.NODE_ENV === 'development') {
    return (
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {children}
      </QueryClientProvider>
    );
  }

  // 本番環境では ErrorBoundary を使用
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ErrorBoundary>
  );
}
