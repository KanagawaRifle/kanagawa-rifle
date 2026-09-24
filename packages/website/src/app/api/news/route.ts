import { NextRequest, NextResponse } from 'next/server';

import { NewsQuerySchema } from '@/features/news/schema';
import {
  CACHE_HEADERS,
  newsErrorResponse,
  newsFailureResponse,
  serializeNewsItem,
  type ApiResponse,
} from '@/features/news/server/http';
import { getNewsList } from '@/features/news/server/news';
import type { NewsItemJson } from '@/features/news/types';
import type { Paginated } from '@/lib/pagination';

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Paginated<NewsItemJson>>>> {
  try {
    const { searchParams } = request.nextUrl;
    const query = NewsQuerySchema.safeParse({
      page: searchParams.get('page') ?? undefined,
      size: searchParams.get('size') ?? undefined,
    });
    if (!query.success) {
      return newsErrorResponse({
        status: 400,
        code: 'VALIDATION_ERROR',
        message: query.error.issues.map((issue) => issue.message).join(', '),
      });
    }

    const result = await getNewsList(query.data);
    return NextResponse.json(
      { data: { ...result, data: result.data.map(serializeNewsItem) } },
      { headers: CACHE_HEADERS.LIST },
    );
  } catch (cause) {
    return newsFailureResponse(cause);
  }
}
