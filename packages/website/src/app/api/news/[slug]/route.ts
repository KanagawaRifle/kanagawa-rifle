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

const CONTENTS_DIR = join(process.cwd(), 'src', 'contents', 'news');

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
    if (!slug) {
      const error = createInvalidNewsSlugError();
      return NextResponse.json({ data: null, error }, { status: error.status });
    }

    // slugから年を抽出（例: 2025-12-09-01 → 2025）
    const year = slug.substring(0, 4);
    const filePath = join(CONTENTS_DIR, year, `${slug}.md`);
    const item = await parseMarkdownFile(filePath, slug);

    return NextResponse.json({ data: item });
  } catch (ex) {
    if (isNodeError(ex) && ex.code === 'ENOENT') {
      const error = createNewsNotFoundError(slug);
      return NextResponse.json({ data: null, error }, { status: error.status });
    }

    console.error('API Internal Error:', ex);
    const error = createInternalServerError(ex as Error);
    return NextResponse.json({ data: null, error }, { status: error.status });
  }
}

// 型ガード
function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error;
}
