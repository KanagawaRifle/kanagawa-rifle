// packages/website/src/lib/ReactQuery.ts

import { UseMutationOptions, DefaultOptions } from '@tanstack/react-query';

import { QUERY_CACHE } from '@/config/cache';

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    staleTime: QUERY_CACHE.STALE_TIME,
    gcTime: QUERY_CACHE.GC_TIME,
    retry: false,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnMount: true,
    refetchOnReconnect: true,
    networkMode: 'online' as const,
  },
  mutations: {
    retry: 1,
    retryDelay: 1000,
    networkMode: 'online' as const,
  },
} satisfies DefaultOptions;

export type ApiFnReturnType<FnType extends (...args: unknown[]) => Promise<unknown>> = Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: unknown[]) => unknown> = Omit<ReturnType<T>, 'queryKey' | 'queryFn'>;

export type MutationConfig<MutationFnType extends (...args: unknown[]) => Promise<unknown>> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
