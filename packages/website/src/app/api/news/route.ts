// packages/website/src/app/api/news/route.ts

import { join } from 'path';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { createInternalServerError, createValidationError } from '@/errors';
import { logger } from '@/lib/logger';
import { getAllNewsFiles, getYearFromSlug, NEWS_CONTENTS_DIR, parseMarkdownFile, CACHE_HEADERS } from '@/lib/news';
import { NewsItem, ApiResponse, Paginated } from '@/types';

/**
 * クエリパラメータのスキーマ定義
 */
const QuerySchema = z.object({
  page: z.coerce
    .number({ error: 'Page must be a number' })
    .int({ error: 'Page must be an integer' })
    .min(1, { error: 'Page number must be greater than 0' })
    .default(1),
  size: z.coerce
    .number({ error: 'Size must be a number' })
    .int({ error: 'Size must be an integer' })
    .min(1, { error: 'Size must be between 1 and 128' })
    .max(128, { error: 'Size must be between 1 and 128' })
    .default(12),
});

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

    // Zod でバリデーション
    const queryResult = QuerySchema.safeParse({
      page: searchParams.get('page') ?? undefined,
      size: searchParams.get('size') ?? undefined,
    });

    if (!queryResult.success) {
      const error = createValidationError(queryResult.error.issues.map((i) => i.message).join(', '));
      return NextResponse.json({ data: null, error }, { status: error.status, headers: CACHE_HEADERS.NO_CACHE });
    }

    const { page, size } = queryResult.data;
    const result = await getPaginatedNews(page, size);

    return NextResponse.json({ data: result }, { headers: CACHE_HEADERS.LIST });
  } catch (ex) {
    logger.error('API Error', { error: ex instanceof Error ? ex.message : String(ex) });
    const error = createInternalServerError(ex as Error);
    return NextResponse.json({ data: null, error }, { status: error.status, headers: CACHE_HEADERS.NO_CACHE });
  }
}
