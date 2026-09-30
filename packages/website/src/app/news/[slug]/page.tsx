import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { JsonLd } from '@/components/JsonLd';
import { PageLayout } from '@/components/PageLayout';
import { env } from '@/config/env';
import { paths } from '@/config/paths';
import { NewsArticle } from '@/features/news/components/NewsArticle';
import { getNewsItemHref } from '@/features/news/paths';
import { getNewsItem, getNewsSlugs } from '@/features/news/server/news';
import { getArticleDescription, getArticleImage, getArticleJsonLd } from '@/features/news/server/seo';
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
  const image = getArticleImage(item);
  return createPageMetadata({
    title: item.title,
    description: getArticleDescription(item),
    path: getNewsItemHref(slug),
    article: item,
    image: image ? { url: image, alt: item.title } : undefined,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  return (
    <PageLayout
      title={article.title}
      page={{
        path: getNewsItemHref(slug),
        description: getArticleDescription(article),
        mainEntity: { '@id': `${new URL(getNewsItemHref(slug), env.APP_URL)}#article` },
      }}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: paths.main.news.name, path: paths.main.news.getHref() },
        { name: article.title, path: getNewsItemHref(slug) },
      ]}
    >
      <JsonLd data={getArticleJsonLd(article)} />
      <NewsArticle news={article} />
    </PageLayout>
  );
}
