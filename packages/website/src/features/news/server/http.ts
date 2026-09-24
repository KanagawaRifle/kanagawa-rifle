import 'server-only';

import { NextResponse } from 'next/server';
import { z } from 'zod';

import { logger } from '@/lib/logger';

import type { NewsItem, NewsItemJson, NewsSummary } from '../types';

export type ApiError = {
  message: string;
  code: string;
  status: number;
};

export type ApiResponse<T> = { data: T } | { data: null; error: ApiError };

export const CACHE_HEADERS = {
  NO_CACHE: {
    'Cache-Control': 'private, no-store, no-cache, must-revalidate',
  },
  LIST: {
    'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600',
  },
  DETAIL: {
    'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=3600',
  },
} as const;

export function serializeNewsItem(item: NewsItem | NewsSummary): NewsItemJson {
  return {
    ...item,
    content: 'content' in item ? item.content : '',
    published: item.published.toISOString(),
    updated: item.updated?.toISOString(),
  };
}

export function newsErrorResponse(error: ApiError): NextResponse<ApiResponse<never>> {
  return NextResponse.json({ data: null, error }, { status: error.status, headers: CACHE_HEADERS.NO_CACHE });
}

/** Keep diagnostics in server logs; never return filesystem paths or raw validation input. */
export function newsFailureResponse(cause: unknown): NextResponse<ApiResponse<never>> {
  logger.error('News API error', { error: cause instanceof Error ? cause.message : String(cause) });
  return newsErrorResponse({
    status: 500,
    code: 'INTERNAL_SERVER',
    message: cause instanceof z.ZodError ? 'API Error: Invalid article format' : 'API Error: Internal server error',
  });
}
