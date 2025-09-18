// packages/website/src/types/news.ts

export type NewsItem = {
  slug: string;
  title: string;
  content: string;
  tags: string[];
  excerpt?: string;
  eyecatch?: string;
  published: Date;
  updated?: Date;
}
