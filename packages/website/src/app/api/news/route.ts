// packages/website/src/app/api/news/route.ts

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

import matter from 'gray-matter';
import { NextRequest, NextResponse } from 'next/server';

import { createInternalServerError, createValidationError } from '@/errors';
import { NewsItem, ApiResponse, Paginated } from '@/types';

type FrontMatter = Omit<NewsItem, 'slug' | 'content'>;
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

// 全てのマークダウンファイルを取得（年ごとのディレクトリ構造に対応）
async function getAllNewsFiles(): Promise<string[]> {
  try {
    // 年ごとのディレクトリを取得
    const yearDirs = await readdir(CONTENTS_DIR);
    const allFiles: string[] = [];

    for (const year of yearDirs) {
      const yearPath = join(CONTENTS_DIR, year);
      try {
        const files = await readdir(yearPath);
        const markdownFiles = files.filter((file) => file.endsWith('.md'));
        allFiles.push(...markdownFiles);
      } catch {
        // ディレクトリでない場合はスキップ
      }
    }

    allFiles.sort((a, b) => b.localeCompare(a));
    return allFiles;
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
      // slugから年を抽出（例: 2025-12-09-01 → 2025）
      const year = slug.substring(0, 4);
      const filePath = join(CONTENTS_DIR, year, file);
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

// キャッシュ設定: 5分間キャッシュ、1時間 stale-while-revalidate
const CACHE_MAX_AGE = 300; // 5分
const CACHE_SWR = 3600; // 1時間

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
      return NextResponse.json({ data: null, error }, { status: error.status });
    }

    if (sizeNum < 1 || sizeNum > 128) {
      const error = createValidationError('Size must be between 1 and 128');
      return NextResponse.json({ data: null, error }, { status: error.status });
    }

    const result = await getPaginatedNews(pageNum, sizeNum);

    // キャッシュヘッダー付きでレスポンス
    return NextResponse.json(
      { data: result },
      {
        headers: {
          'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_SWR}`,
        },
      },
    );
  } catch (ex) {
    console.error('API Error:', ex);
    const error = createInternalServerError(ex as Error);
    return NextResponse.json({ data: null, error }, { status: error.status });
  }
}
