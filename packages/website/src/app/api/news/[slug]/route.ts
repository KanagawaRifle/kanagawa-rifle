// packages/website/src/app/api/news/[slug]/route.ts

import { join } from 'path';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { createInvalidNewsSlugError, createInternalServerError, createNewsNotFoundError } from '@/errors';
import { logger } from '@/lib/logger';
import {
  isValidSlug,
  getYearFromSlug,
  NEWS_CONTENTS_DIR,
  parseMarkdownFile,
  isNodeError,
  CACHE_HEADERS,
} from '@/lib/news';
import { NewsItem, ApiResponse } from '@/types';

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

    const year = getYearFromSlug(slug);
    const filePath = join(NEWS_CONTENTS_DIR, year, `${slug}.md`);
    const item = await parseMarkdownFile(filePath, slug, true);

    return NextResponse.json({ data: item }, { headers: CACHE_HEADERS.DETAIL });
  } catch (ex) {
    // ファイルが見つからない場合
    if (isNodeError(ex) && ex.code === 'ENOENT') {
      const error = createNewsNotFoundError(slug);
      return NextResponse.json({ data: null, error }, { status: error.status, headers: CACHE_HEADERS.NO_CACHE });
    }

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
