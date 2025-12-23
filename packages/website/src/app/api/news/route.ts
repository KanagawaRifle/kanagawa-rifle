// packages/website/src/app/api/news/route.ts

import { join } from 'path';

import { NextRequest, NextResponse } from 'next/server';

import { createInternalServerError, createValidationError } from '@/errors';
import { logger } from '@/lib/logger';
import { getAllNewsFiles, getYearFromSlug, NEWS_CONTENTS_DIR, parseMarkdownFile, CACHE_HEADERS } from '@/lib/news';
import { NewsItem, ApiResponse, Paginated } from '@/types';

/**
 * ページネーション処理
 */
async function getPaginatedNews(page: number, size: number): Promise<Paginated<NewsItem>> {
  const files = await getAllNewsFiles();
  const total = files.length;
  const totalPages = Math.ceil(total / size);
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedFiles = files.slice(startIndex, endIndex);

  const newsItems = await Promise.all(
    paginatedFiles.map(async (file) => {
      const slug = file.replace('.md', '');
      const year = getYearFromSlug(slug);
      const filePath = join(NEWS_CONTENTS_DIR, year, file);
      return await parseMarkdownFile(filePath, slug, false);
    }),
  );

  return {
    data: newsItems,
    pagination: {
      current: page,
      size,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Paginated<NewsItem>>>> {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const size = searchParams.get('size');

    // ページネーション処理
    const pageNum = page ? parseInt(page, 10) : 1;
    const sizeNum = size ? parseInt(size, 10) : 12;

    // バリデーション
    if (pageNum < 1) {
      const error = createValidationError('Page number must be greater than 0');
      return NextResponse.json({ data: null, error }, { status: error.status, headers: CACHE_HEADERS.NO_CACHE });
    }

    if (sizeNum < 1 || sizeNum > 128) {
      const error = createValidationError('Size must be between 1 and 128');
      return NextResponse.json({ data: null, error }, { status: error.status, headers: CACHE_HEADERS.NO_CACHE });
    }

    const result = await getPaginatedNews(pageNum, sizeNum);

    return NextResponse.json({ data: result }, { headers: CACHE_HEADERS.LIST });
  } catch (ex) {
    logger.error('API Error', { error: ex instanceof Error ? ex.message : String(ex) });
    const error = createInternalServerError(ex as Error);
    return NextResponse.json({ data: null, error }, { status: error.status, headers: CACHE_HEADERS.NO_CACHE });
  }
}
