import 'server-only';

import matter from 'gray-matter';
import { JSON_SCHEMA, load } from 'js-yaml';

import { FrontMatterSchema } from '../schema';
import type { NewsItem } from '../types';

/** Parse source text independently of storage, preserving dates until Zod validates them. */
export function parseArticle(slug: string, source: string): NewsItem {
  const { data, content } = matter(source, {
    engines: {
      yaml: (metadata) => load(metadata, { schema: JSON_SCHEMA }) as object,
    },
  });
  return { slug, ...FrontMatterSchema.parse(data), content: content.trim() };
}
