import { z } from 'zod';

import { DEFAULT_NEWS_PAGE_SIZE } from './constants';

const ArticleDateSchema = z.union([z.iso.date(), z.iso.datetime({ offset: true })]).pipe(z.coerce.date());

export const FrontMatterSchema = z.object({
  title: z.string().min(1),
  published: ArticleDateSchema,
  updated: ArticleDateSchema.optional(),
  tags: z.array(z.string()).default([]),
  excerpt: z.string().optional(),
  eyecatch: z.string().optional(),
});

export const NewsQuerySchema = z.object({
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
    .default(DEFAULT_NEWS_PAGE_SIZE),
});

export type NewsQuery = z.infer<typeof NewsQuerySchema>;

/** YYYY-MM-DD-NN; also prevents path separators in filesystem lookups. */
export function isValidSlug(slug: string): boolean {
  return /^\d{4}-\d{2}-\d{2}-\d{2}$/.test(slug);
}
