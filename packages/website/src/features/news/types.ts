import type { z } from 'zod';

import type { FrontMatterSchema } from './schema';

/** Validated metadata used by listings, metadata and the sitemap. */
export type NewsSummary = z.output<typeof FrontMatterSchema> & { slug: string };

export type NewsItem = NewsSummary & { content: string };

/** Public JSON contract. Dates cross the HTTP boundary as ISO strings. */
export type NewsItemJson = Omit<NewsItem, 'published' | 'updated'> & {
  published: string;
  updated?: string;
};
