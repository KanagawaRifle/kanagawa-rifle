// packages/website/src/app/api/news/[slug]/route.ts

import { readFile } from 'fs/promises';
import { join } from 'path';

import matter from 'gray-matter';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { createInvalidNewsSlugError, createInternalServerError, createNewsNotFoundError } from '@/errors';
import { NewsItem, ApiResponse } from '@/types';

const FrontMatterSchema = z.object({
  title: z.string(),
  published: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  excerpt: z.string().optional(),
  eyecatch: z.string().optional(),
});

// slug のフォーマット: YYYY-MM-DD-NN（例: 2024-01-15-01）
const SLUG_PATTERN = /^\d{4}-\d{2}-\d{2}-\d{2}$/;

/**
 * slug の形式を検証（パストラバーサル攻撃防止）
 */
function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}

const CONTENTS_DIR = join(process.cwd(), 'src', 'contents', 'news');

// キャッシュ設定: 10分間キャッシュ、1時間 stale-while-revalidate
const CACHE_MAX_AGE = 600; // 10分
const CACHE_SWR = 3600; // 1時間
const NO_CACHE_HEADERS = {
  'Cache-Control': 'private, no-store, no-cache, must-revalidate',
};

async function parseMarkdownFile(filePath: string, slug: string): Promise<NewsItem> {
  const fileContent = await readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const validatedData = FrontMatterSchema.parse(data);

  return {
    slug,
    ...validatedData,
    content: content.trim(),
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse<ApiResponse<NewsItem>>> {
  const { slug } = await params;

  try {
    // slug のフォーマット検証（パストラバーサル攻撃防止）
    if (!slug || !isValidSlug(slug)) {
      const error = createInvalidNewsSlugError();
      return NextResponse.json({ data: null, error }, { status: error.status, headers: NO_CACHE_HEADERS });
    }

    // slugから年を抽出（例: 2025-12-09-01 → 2025）
    const year = slug.substring(0, 4);
    const filePath = join(CONTENTS_DIR, year, `${slug}.md`);
    const item = await parseMarkdownFile(filePath, slug);

    // キャッシュヘッダー付きでレスポンス
    return NextResponse.json(
      { data: item },
      {
        headers: {
          'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_SWR}`,
        },
      },
    );
  } catch (ex) {
    // ファイルが見つからない場合
    if (isNodeError(ex) && ex.code === 'ENOENT') {
      const error = createNewsNotFoundError(slug);
      return NextResponse.json({ data: null, error }, { status: error.status, headers: NO_CACHE_HEADERS });
    }

    // Zod バリデーションエラー（フロントマターの形式が不正）
    if (ex instanceof z.ZodError) {
      console.warn('Front matter validation error:', slug, ex.issues);
      const error = createInternalServerError(new Error('Invalid article format'));
      return NextResponse.json({ data: null, error }, { status: error.status, headers: NO_CACHE_HEADERS });
    }

    console.error('API Internal Error:', ex);
    const error = createInternalServerError(ex as Error);
    return NextResponse.json({ data: null, error }, { status: error.status, headers: NO_CACHE_HEADERS });
  }
}

// 型ガード
function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error;
}
