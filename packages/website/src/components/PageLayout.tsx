import { Breadcrumbs, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import React from 'react';
import { LuChevronRight } from 'react-icons/lu';

type Props = {
  title?: string;
  description?: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
  children: React.ReactNode;
  withStack?: boolean;
};

export function PageLayout({ title, description, breadcrumbs, children, withStack = true }: Props) {
  return (
    <div>
      {breadcrumbs && (
        <Toolbar variant="dense" className="mx-auto w-full max-w-screen-md">
          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs.map((breadcrumb, index) => {
              return index < breadcrumbs.length - 1 ? (
                <Link
                  key={index}
                  className="flex items-center gap-2 text-xs hover:underline"
                  color="inherit"
                  href={breadcrumb.path}
                >
                  {index === 0 && <LuChevronRight />}
                  {breadcrumb.name}
                </Link>
              ) : (
                <Typography key={index} color="text.primary">
                  <span className="text-xs">{breadcrumb.name}</span>
                </Typography>
              );
            })}
          </Breadcrumbs>
        </Toolbar>
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
