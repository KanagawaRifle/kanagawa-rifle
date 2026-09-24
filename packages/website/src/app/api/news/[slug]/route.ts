// packages/website/src/app/api/news/[slug]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { createInternalServerError, createInvalidNewsSlugError, createNewsNotFoundError } from '@/errors';
import { CACHE_HEADERS } from '@/features/news/http';
import { isValidSlug } from '@/features/news/schema';
import { getNewsItem } from '@/features/news/server/news';
import { logger } from '@/lib/logger';
import { ApiResponse, NewsItem } from '@/types';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse<ApiResponse<NewsItem>>> {
  const { slug } = await params;

  try {
    // slug のフォーマット検証（パストラバーサル攻撃防止）
    if (!slug || !isValidSlug(slug)) {
      const error = createInvalidNewsSlugError();
      return NextResponse.json({ data: null, error }, { status: error.status, headers: CACHE_HEADERS.NO_CACHE });
    }

    const item = await getNewsItem(slug);
    if (item === null) {
      const error = createNewsNotFoundError(slug);
      return NextResponse.json({ data: null, error }, { status: error.status, headers: CACHE_HEADERS.NO_CACHE });
    }

    return NextResponse.json({ data: item }, { headers: CACHE_HEADERS.DETAIL });
  } catch (ex) {
    // Zod バリデーションエラー（フロントマターの形式が不正）
    if (ex instanceof z.ZodError) {
      logger.warn('Front matter validation error', { slug, issues: ex.issues });
      const error = createInternalServerError(new Error('Invalid article format'));
      return NextResponse.json({ data: null, error }, { status: error.status, headers: CACHE_HEADERS.NO_CACHE });
    }

    logger.error('API Internal Error', { error: ex instanceof Error ? ex.message : String(ex) });
    const error = createInternalServerError(ex as Error);
    return NextResponse.json({ data: null, error }, { status: error.status, headers: CACHE_HEADERS.NO_CACHE });
  }
}
