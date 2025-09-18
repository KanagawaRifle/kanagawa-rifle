// packages/website/src/app/api/news/route.ts

import { readdir, readFile, stat } from 'fs/promises';
import { join } from 'path';

import matter from 'gray-matter';
import { NextRequest, NextResponse } from 'next/server';

import {
  createInternalServerError,
  createValidationError
} from '@/errors'
import {NewsItem, ApiResponse, Paginated} from '@/types'

type FrontMatter = Omit<NewsItem, 'slug' | 'content'>
const CONTENTS_DIR = join(process.cwd(), 'src', 'contents', 'news');

// マークダウンファイルを読み込んで解析
async function parseMarkdownFile(filePath: string, slug: string, withContent = false): Promise<NewsItem> {
  try {
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
      content: withContent ? content.trim() : '',
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

// 全てのマークダウンファイルを取得
async function getAllNewsFiles(): Promise<string[]> {
  try {
    const files = await readdir(CONTENTS_DIR);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    // ファイルの更新日時でソート（新しい順）
    const filesWithStats = await Promise.all(
      markdownFiles.map(async (file) => {
        const filePath = join(CONTENTS_DIR, file);
        const stats = await stat(filePath);
        return { file, mtime: stats.mtime };
      })
    );

    filesWithStats.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    return filesWithStats.map(({ file }) => file);
  } catch (error) {
    console.error('Error reading news directory:', error);
    return [];
  }
}

// ページネーション処理
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
      const filePath = join(CONTENTS_DIR, file);
      return await parseMarkdownFile(filePath, slug, false);
    })
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

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Paginated<NewsItem>>>>
{
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const size = searchParams.get('size');

    // ページネーション処理
    const pageNum = page ? parseInt(page, 10) : 1;
    const sizeNum = size ? parseInt(size, 10) : 12;

    // バリデーション
    if (pageNum < 1) {
      const error = createValidationError('Page number must be greater than 0')
      return NextResponse.json(
        { data: null, error },
        { status: error.status }
      );
    }

    if (sizeNum < 1 || sizeNum > 128) {
      const error = createValidationError('Size must be between 1 and 128')
      return NextResponse.json(
        { data: null, error },
        { status: error.status }
      );
    }

    const result = await getPaginatedNews(pageNum, sizeNum);

    return NextResponse.json({data: result});
  } catch (ex) {
    console.error('API Error:', ex);
    const error = createInternalServerError(ex as Error);
    return NextResponse.json(
      { data: null, error },
      { status: error.status }
    );
  }
}
