import { Breadcrumbs, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import React from 'react';
import { LuChevronRight } from 'react-icons/lu';

import { env } from '@/config';

type Props = {
  title?: string;
  description?: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
  children: React.ReactNode;
  withStack?: boolean;
};

function BreadcrumbJsonLd({ breadcrumbs }: { breadcrumbs: Array<{ name: string; path: string }> }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, env.APP_URL).toString(),
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export function PageLayout({ title, description, breadcrumbs, children, withStack = true }: Props) {
  return (
    <div>
      {breadcrumbs && (
        <>
          <BreadcrumbJsonLd breadcrumbs={breadcrumbs} />
          <Toolbar variant="dense" className="mx-auto w-full max-w-screen-md">
            <Breadcrumbs aria-label="breadcrumb">
              {breadcrumbs.map((breadcrumb, index) => {
                return index < breadcrumbs.length - 1 ? (
                  <Link
                    key={breadcrumb.path}
                    className="flex items-center gap-2 text-xs hover:underline"
                    color="inherit"
                    href={breadcrumb.path}
                  >
                    {index === 0 && <LuChevronRight />}
                    {breadcrumb.name}
                  </Link>
                ) : (
                  <Typography key={breadcrumb.path} color="text.primary">
                    <span className="text-xs">{breadcrumb.name}</span>
                  </Typography>
                );
              })}
            </Breadcrumbs>
          </Toolbar>
        </>
      )}
      <div className="container mx-auto flex w-full max-w-screen-md flex-col gap-4 px-1 py-8 md:px-4">
        {title && <h1 className="text-2xl leading-tight font-bold md:text-3xl dark:text-white">{title}</h1>}
        {description && (
          <div className="mb-8 rounded-lg bg-gray-50 p-6 leading-relaxed text-gray-500 italic">{description}</div>
        )}
        {withStack ? <div className="flex flex-col gap-6">{children}</div> : <div>{children}</div>}
      </div>
    </div>
  );
}
