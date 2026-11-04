import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { ArticlePageLayout } from '@/components/ArticlePageLayout';
import { JsonLd } from '@/components/JsonLd';
import { env } from '@/config/env';
import { paths } from '@/config/paths';
import { NewsArticle } from '@/features/news/components/NewsArticle';
import { NewsArticleNavigation } from '@/features/news/components/NewsArticleNavigation';
import { formatNewsDate } from '@/features/news/dates';
import { getNewsItemHref } from '@/features/news/paths';
import { getNewsItem, getNewsNavigation, getNewsSlugs } from '@/features/news/server/news';
import { getArticleDescription, getArticleImageMetadata, getArticleJsonLd } from '@/features/news/server/seo';
import { createPageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ slug: string }> };

// Articles are published by rebuilding the Git content tree, never on demand.
export const dynamicParams = false;

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
  const image = getArticleImageMetadata(item);
  return createPageMetadata({
    title: `${item.title}（${formatNewsDate(item.published)}）`,
    description: getArticleDescription(item),
    path: getNewsItemHref(slug),
    article: item,
    image,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [article, navigation] = await Promise.all([getArticle(slug), getNewsNavigation(slug)]);
  return (
    <ArticlePageLayout
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
      <NewsArticleNavigation {...navigation} />
    </ArticlePageLayout>
  );
}
