// Shared markup for page layouts with different stylesheet entries.

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { JsonLd } from '@/components/JsonLd';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { app } from '@/config/app';
import { env } from '@/config/env';
import { createWebPageJsonLd, type WebPageOptions } from '@/lib/structured-data';

type Props = {
  title?: string;
  description?: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
  children: React.ReactNode;
  withStack?: boolean;
  page?: WebPageOptions;
};

function BreadcrumbJsonLd({
  breadcrumbs,
  path,
}: {
  breadcrumbs: Array<{ name: string; path: string }>;
  path?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    ...(path ? { '@id': `${new URL(path, env.APP_URL)}#breadcrumb` } : {}),
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, env.APP_URL).toString(),
    })),
  };

  return <JsonLd data={jsonLd} />;
}

export function PageLayout({ title, description, breadcrumbs, children, withStack = true, page }: Props) {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      {page && (
        <JsonLd data={createWebPageJsonLd({ ...page, title: title ?? app.name, withBreadcrumbs: !!breadcrumbs })} />
      )}
      {breadcrumbs && (
        <>
          <BreadcrumbJsonLd breadcrumbs={breadcrumbs} path={page?.path} />
          <Breadcrumb aria-label="パンくずリスト" className="mx-auto w-full max-w-screen-md px-4 py-2">
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={breadcrumb.path}>
                    <BreadcrumbItem>
                      {index === 0 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
                      {isLast ? (
                        <BreadcrumbPage className="text-xs">{breadcrumb.name}</BreadcrumbPage>
                      ) : (
                        <Link
                          href={breadcrumb.path}
                          prefetch={false}
                          className="hover:text-foreground text-xs transition-colors"
                        >
                          {breadcrumb.name}
                        </Link>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </>
      )}
      <div className="container mx-auto flex w-full max-w-screen-md flex-col gap-4 px-1 py-8 md:px-4">
        {title && <h1 className="text-2xl leading-tight font-bold md:text-3xl dark:text-white">{title}</h1>}
        {description && (
          <p className="bg-muted text-muted-foreground mb-8 rounded-lg p-6 leading-relaxed italic">{description}</p>
        )}
        {withStack ? <div className="flex flex-col gap-6">{children}</div> : <div>{children}</div>}
      </div>
    </main>
  );
}
