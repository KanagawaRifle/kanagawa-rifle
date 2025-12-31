// packages/website/src/components/PageLayout.tsx

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
          <div className="mx-auto w-full max-w-screen-md px-4 py-2">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <BreadcrumbItem key={breadcrumb.path}>
                      {index === 0 && <ChevronRight className="h-3 w-3" />}
                      {isLast ? (
                        <BreadcrumbPage className="text-xs">{breadcrumb.name}</BreadcrumbPage>
                      ) : (
                        <>
                          <BreadcrumbLink asChild className="text-xs">
                            <Link href={breadcrumb.path}>{breadcrumb.name}</Link>
                          </BreadcrumbLink>
                          <BreadcrumbSeparator />
                        </>
                      )}
                    </BreadcrumbItem>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </>
      )}
      <div className="container mx-auto flex w-full max-w-screen-md flex-col gap-4 px-1 py-8 md:px-4">
        {title && <h1 className="text-2xl leading-tight font-bold md:text-3xl dark:text-white">{title}</h1>}
        {description && (
          <div className="mb-8 rounded-lg bg-muted p-6 leading-relaxed text-muted-foreground italic">{description}</div>
        )}
        {withStack ? <div className="flex flex-col gap-6">{children}</div> : <div>{children}</div>}
      </div>
    </div>
  );
}
