import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageLayout } from '@/components';
import { app, env, paths } from '@/config';
import { NewsItemGet } from '@/features/news/components/NewsItemGet';
import { getNewsItem, getNewsSlugs } from '@/features/news/server/news';

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
  const image = new URL(`/api/og?title=${encodeURIComponent(item.title)}`, env.APP_URL);
  return {
    title: item.title,
    description: item.excerpt ?? item.title,
    openGraph: { images: image },
    twitter: { images: image },
  };
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': new URL(`/news/${slug}`, env.APP_URL).toString() },
  };
  return (
    <PageLayout
      title={article.title}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: paths.main.news.name, path: paths.main.news.getHref() },
        { name: article.title, path: `/news/${slug}` },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />
      <NewsItemGet news={article} />
    </PageLayout>
  );
}
