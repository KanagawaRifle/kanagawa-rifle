import { app } from '@/config/app';
import { env } from '@/config/env';
import { seoIds } from '@/config/seo';

export type WebPageOptions = {
  path: string;
  description?: string;
  type?: 'WebPage' | 'AboutPage' | 'CollectionPage';
  mainEntity?: Record<string, unknown>;
};

/** Use the canonical URL as page identity, including distinct pagination. */
export function createWebPageJsonLd({
  title,
  description = app.description,
  path,
  type = 'WebPage',
  mainEntity,
  withBreadcrumbs = false,
}: WebPageOptions & { title: string; withBreadcrumbs?: boolean }) {
  const url = new URL(path, env.APP_URL).toString();
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': url,
    url,
    name: title,
    description,
    inLanguage: 'ja',
    isPartOf: { '@id': seoIds.website },
    publisher: { '@id': seoIds.organization },
    ...(withBreadcrumbs ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...(mainEntity ? { mainEntity } : {}),
  };
}
