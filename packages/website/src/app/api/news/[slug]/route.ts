// packages/website/src/app/api/news/[slug]/route.ts

import { readFile, stat } from 'fs/promises';
import { join } from 'path';

import matter from 'gray-matter';
import { NextRequest, NextResponse } from 'next/server';

import {createInvalidNewsSlugError, createInternalServerError} from '@/errors'
import {NewsItem, ApiResponse} from '@/types'

type FrontMatter = Omit<NewsItem, 'slug' | 'content'>
const CONTENTS_DIR = join(process.cwd(), 'src', 'contents', 'news');
async function parseMarkdownFile(filePath: string, slug: string): Promise<NewsItem> {
  try{
  const fileContent = await readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent) as unknown as {
    data: FrontMatter;
    content: string;
  };
  const parseDate = (dateValue: unknown): Date | undefined => {
    if (!dateValue) return undefined;
    const date = new Date(dateValue as string);
    return isNaN(date.getTime()) ? undefined : date;
  };

  return {
    slug,
    title: data.title ?? slug,
    content: content.trim(),
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt ?? undefined,
    eyecatch: data.eyecatch ?? undefined,
    published: parseDate(data.published) ?? new Date(),
    updated: parseDate(data.updated),
  };
} catch (error) {
  console.error(`Error parsing markdown file ${filePath}:`, error);
  throw error;
}
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<ApiResponse<NewsItem>>> {
  try {
    const { slug } = await params;

    if (!slug) {
      const error = createInvalidNewsSlugError();
      return NextResponse.json<ApiResponse<NewsItem>>(
        { data: null, error },
        { status: error.status }
      );
    }

    const filePath = join(CONTENTS_DIR, `${slug}.md`);

    // ファイルの存在確認
    try {
      await stat(filePath);
    } catch (ex) {
      console.error('API Error:', ex);
      const error = createInternalServerError(ex as Error);
      return NextResponse.json(
        { data: null, error },
        { status: error.status }
      );
    }

    const newsItem = await parseMarkdownFile(filePath, slug);

    return NextResponse.json({data: newsItem});
  } catch (ex) {
    console.error('API Error:', ex);
    const error = createInternalServerError(ex as Error);
    return NextResponse.json(
      { data: null, error },
      { status: error.status }
    );
  }
}
