import { NextRequest, NextResponse } from 'next/server';

import { isValidSlug } from '@/features/news/schema';
import {
  CACHE_HEADERS,
  newsErrorResponse,
  newsFailureResponse,
  serializeNewsItem,
  type ApiResponse,
} from '@/features/news/server/http';
import { getNewsItem } from '@/features/news/server/news';
import type { NewsItemJson } from '@/features/news/types';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse<ApiResponse<NewsItemJson>>> {
  try {
    const { slug } = await params;
    if (!isValidSlug(slug)) {
      return newsErrorResponse({ status: 400, code: 'INVALID_NEWS_SLUG', message: 'Invalid slug parameter' });
    }

    const item = await getNewsItem(slug);
    if (item === null) {
      return newsErrorResponse({
        status: 404,
        code: 'NEWS_NOT_FOUND',
        message: `News with slug "${slug}" not found`,
      });
    }
    return NextResponse.json({ data: serializeNewsItem(item) }, { headers: CACHE_HEADERS.DETAIL });
  } catch (cause) {
    return newsFailureResponse(cause);
  }
}
