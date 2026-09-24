import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { JsonLd } from '@/components/JsonLd';
import { PageLayout } from '@/components/PageLayout';
import { app } from '@/config/app';
import { env } from '@/config/env';
import { paths } from '@/config/paths';
import { NewsArticle } from '@/features/news/components/NewsArticle';
import { getNewsItemHref } from '@/features/news/paths';
import { getNewsItem, getNewsSlugs } from '@/features/news/server/news';
import { createPageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ slug: string }> };

const getArticle = cache(async (slug: string) => {
  const article = await getNewsItem(slug);
  if (!article) notFound();
  return article;
});

export async function generateStaticParams() {
  return (await getNewsSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getArticle(slug);
  return createPageMetadata({ title: item.title, description: item.excerpt ?? item.title });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt ?? article.title,
    datePublished: article.published.toISOString(),
    dateModified: (article.updated ?? article.published).toISOString(),
    author: { '@type': 'Organization', name: app.name, url: env.APP_URL },
    publisher: { '@type': 'Organization', name: app.name, url: env.APP_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': new URL(getNewsItemHref(slug), env.APP_URL).toString() },
  };
  return (
    <PageLayout
      title={article.title}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: paths.main.news.name, path: paths.main.news.getHref() },
        { name: article.title, path: getNewsItemHref(slug) },
      ]}
    >
      <JsonLd data={articleJsonLd} />
      <NewsArticle news={article} />
    </PageLayout>
  );
}
