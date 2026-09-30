import type { Metadata } from 'next';

import { app } from '@/config/app';
import { env } from '@/config/env';
import { NEWS_FEED_PATH } from '@/config/paths';
import { isPreviewDeployment } from '@/config/seo';

export function getSocialImageUrl(title: string): URL {
  const image = new URL('/api/og', env.APP_URL);
  image.searchParams.set('title', title);
  return image;
}

type PageMetadataOptions = {
  title: string;
  description?: string;
  path: string;
  noindex?: boolean;
  image?: { url: string; alt: string };
  article?: { published: Date; updated?: Date; tags: string[] };
};

export function createPageMetadata({
  title,
  description = app.description,
  path,
  noindex = false,
  article,
  image: articleImage,
}: PageMetadataOptions): Metadata {
  const url = new URL(path, env.APP_URL);
  const fullTitle = title === app.name ? title : `${title}：${app.name}`;
  const image = articleImage ?? { url: getSocialImageUrl(title), width: 1200, height: 630, alt: fullTitle };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(!isPreviewDeployment()
        ? { types: { 'application/atom+xml': new URL(NEWS_FEED_PATH, env.APP_URL).toString() } }
        : {}),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: app.name,
      locale: 'ja_JP',
      images: [image],
      ...(article
        ? {
            type: 'article',
            publishedTime: article.published.toISOString(),
            modifiedTime: (article.updated ?? article.published).toISOString(),
            authors: [new URL('/about', env.APP_URL).toString()],
            tags: article.tags,
          }
        : { type: 'website' }),
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image] },
    robots: {
      index: !noindex && !isPreviewDeployment(),
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}
