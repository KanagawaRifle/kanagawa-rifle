import 'server-only';

import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import matter from 'gray-matter';
import { JSON_SCHEMA, load } from 'js-yaml';

import { FrontMatterSchema, isValidSlug, NewsQuerySchema, type NewsQuery } from '@/features/news/schema';
import type { NewsItem, Paginated } from '@/types';

const NEWS_CONTENTS_DIR = join(process.cwd(), 'src', 'contents', 'news');

async function getYears(): Promise<string[]> {
  const entries = await fs.readdir(NEWS_CONTENTS_DIR, { withFileTypes: true });
  return entries.map((entry) => {
    if (!entry.isDirectory() || !/^\d{4}$/.test(entry.name)) {
      throw new Error(`Invalid news year directory: ${entry.name}`);
    }
    return entry.name;
  });
}

async function getSlugsForYear(year: string): Promise<string[]> {
  const entries = await fs.readdir(join(NEWS_CONTENTS_DIR, year), { withFileTypes: true });
  return entries.map((entry) => {
    const slug = entry.name.slice(0, -3);
    if (!entry.isFile() || !entry.name.endsWith('.md') || !isValidSlug(slug) || !slug.startsWith(`${year}-`)) {
      throw new Error(`Invalid news article path: ${year}/${entry.name}`);
    }
    return slug;
  });
}

async function readArticle(slug: string, withContent = true): Promise<NewsItem> {
  const source = await fs.readFile(join(NEWS_CONTENTS_DIR, slug.slice(0, 4), `${slug}.md`), 'utf-8');
  const { data, content } = matter(source, {
    engines: {
      // Keep date scalars intact so invalid calendar dates cannot be normalized before validation.
      yaml: (metadata) => load(metadata, { schema: JSON_SCHEMA }) as object,
    },
  });
  return {
    slug,
    ...FrontMatterSchema.parse(data),
    content: withContent ? content.trim() : '',
  };
}

/** The Git content tree is the source of truth; no independent filesystem cache. */
export async function getNewsSlugs(): Promise<string[]> {
  const years = await getYears();
  const slugs = await Promise.all(years.map(getSlugsForYear));
  return slugs.flat().sort((a, b) => b.localeCompare(a));
}

export async function getNewsItem(slug: string): Promise<NewsItem | null> {
  if (!isValidSlug(slug)) return null;

  // Confirm directory reads succeeded before treating an article as absent.
  const years = await getYears();
  const year = slug.slice(0, 4);
  if (!years.includes(year)) return null;
  const slugs = await getSlugsForYear(year);
  if (!slugs.includes(slug)) return null;

  return readArticle(slug);
}

export async function getNewsList(query: NewsQuery): Promise<Paginated<NewsItem>> {
  const { page, size } = NewsQuerySchema.parse(query);
  const slugs = await getNewsSlugs();
  const total = slugs.length;
  const totalPages = Math.ceil(total / size);
  const start = (page - 1) * size;
  const data = await Promise.all(slugs.slice(start, start + size).map((slug) => readArticle(slug, false)));

  return {
    data,
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

export async function getAllNews(): Promise<NewsItem[]> {
  const slugs = await getNewsSlugs();
  return Promise.all(slugs.map((slug) => readArticle(slug)));
}
