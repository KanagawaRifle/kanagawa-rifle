// packages/website/src/app/api/news/route.ts

import { NextRequest, NextResponse } from 'next/server';

import { createInternalServerError, createValidationError } from '@/errors';
import { CACHE_HEADERS } from '@/features/news/http';
import { NewsQuerySchema } from '@/features/news/schema';
import { getNewsList } from '@/features/news/server/news';
import { logger } from '@/lib/logger';
import { ApiResponse, NewsItem, Paginated } from '@/types';

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Paginated<NewsItem>>>> {
  try {
    const { searchParams } = new URL(request.url);

    // Zod でバリデーション
    const queryResult = NewsQuerySchema.safeParse({
      page: searchParams.get('page') ?? undefined,
      size: searchParams.get('size') ?? undefined,
    });

    if (!queryResult.success) {
      const error = createValidationError(queryResult.error.issues.map((i) => i.message).join(', '));
      return NextResponse.json({ data: null, error }, { status: error.status, headers: CACHE_HEADERS.NO_CACHE });
    }

    const result = await getNewsList(queryResult.data);

    return NextResponse.json({ data: result }, { headers: CACHE_HEADERS.LIST });
  } catch (ex) {
    logger.error('API Error', { error: ex instanceof Error ? ex.message : String(ex) });
    const error = createInternalServerError(ex as Error);
    return NextResponse.json({ data: null, error }, { status: error.status, headers: CACHE_HEADERS.NO_CACHE });
  }
}
