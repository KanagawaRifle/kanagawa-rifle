// packages/website/src/lib/news.ts

import { readFile, readdir } from 'fs/promises';
import { join } from 'path';

import matter from 'gray-matter';
import { z } from 'zod';

import { NewsItem } from '@/types';

/**
 * FrontMatter のスキーマ定義
 */
export const FrontMatterSchema = z.object({
  title: z.string(),
  published: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  excerpt: z.string().optional(),
  eyecatch: z.string().optional(),
});

export type FrontMatter = z.infer<typeof FrontMatterSchema>;

/**
 * slug のフォーマット: YYYY-MM-DD-NN（例: 2024-01-15-01）
 */
const SLUG_PATTERN = /^\d{4}-\d{2}-\d{2}-\d{2}$/;

/**
 * slug の形式を検証（パストラバーサル攻撃防止）
 */
export function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}

/**
 * slug から年を抽出（例: 2025-12-09-01 → 2025）
 */
export function getYearFromSlug(slug: string): string {
  return slug.substring(0, 4);
}

/**
 * ニュースコンテンツのディレクトリパス
 */
export const NEWS_CONTENTS_DIR = join(process.cwd(), 'src', 'contents', 'news');

/**
 * マークダウンファイルを読み込んでパース
 * @param filePath ファイルパス
 * @param slug 記事のslug
 * @param withContent 本文を含めるかどうか
 */
export async function parseMarkdownFile(
  filePath: string,
  slug: string,
  withContent: boolean = true,
): Promise<NewsItem> {
  const fileContent = await readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const validatedData = FrontMatterSchema.parse(data);

  return {
    slug,
    ...validatedData,
    content: withContent ? content.trim() : '',
  };
}

// ファイル一覧のメモリキャッシュ（Serverless のホットスタート時に有効）
let cachedFiles: string[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5分

/**
 * 全てのニュース記事ファイルを取得（年ごとのディレクトリ構造に対応）
 * キャッシュを使用してディレクトリ走査を最適化
 */
export async function getAllNewsFiles(): Promise<string[]> {
  const now = Date.now();

  // キャッシュが有効な場合はキャッシュから返す
  if (cachedFiles !== null && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedFiles;
  }

  try {
    // 年ごとのディレクトリを取得
    const yearDirs = await readdir(NEWS_CONTENTS_DIR);
    const allFiles: string[] = [];

    for (const year of yearDirs) {
      const yearPath = join(NEWS_CONTENTS_DIR, year);
      try {
        const files = await readdir(yearPath);
        const markdownFiles = files.filter((file) => file.endsWith('.md'));
        allFiles.push(...markdownFiles);
      } catch {
        // ディレクトリでない場合はスキップ
      }
    }

    allFiles.sort((a, b) => b.localeCompare(a));

    // キャッシュを更新
    cachedFiles = allFiles;
    cacheTimestamp = now;

    return allFiles;
  } catch (error) {
    console.error('Error reading news directory:', error);
    return [];
  }
}

/**
 * Node.js エラーの型ガード
 */
export function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error;
}

/**
 * キャッシュヘッダー定数
 */
export const CACHE_HEADERS = {
  /** エラーレスポンス用のキャッシュ無効化ヘッダー */
  NO_CACHE: {
    'Cache-Control': 'private, no-store, no-cache, must-revalidate',
  },
  /** 一覧API用のキャッシュヘッダー（5分キャッシュ、1時間SWR） */
  LIST: {
    'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600',
  },
  /** 詳細API用のキャッシュヘッダー（10分キャッシュ、1時間SWR） */
  DETAIL: {
    'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=3600',
  },
} as const;
