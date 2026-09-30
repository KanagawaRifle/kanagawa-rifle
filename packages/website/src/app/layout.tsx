// packages/website/src/app/layout.tsx
// cspell:ignore msvalidate

import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import React from 'react';

import { Analytics } from '@/components/Analytics';
import { Frame } from '@/components/Frame';
import { JsonLd } from '@/components/JsonLd';
import { app } from '@/config/app';
import { env } from '@/config/env';
import { organizationJsonLd } from '@/config/organization';
import { isPreviewDeployment, seoIds } from '@/config/seo';
import { createPageMetadata } from '@/lib/metadata';
import { ThemeProvider } from '@/providers/ThemeProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  ...createPageMetadata({ title: app.name, description: app.description, path: '/' }),
  // Canonicals belong to real pages; 404 responses must not inherit the home URL.
  alternates: undefined,
  title: {
    default: app.name,
    template: `%s：${app.name}`,
  },
  description: app.description,
  formatDetection: { telephone: false },
  metadataBase: new URL(env.APP_URL),
  appleWebApp: {
    title: app.name,
  },
  verification: isPreviewDeployment()
    ? undefined
    : {
        google: env.GOOGLE_SITE_VERIFICATION || undefined,
        other: env.BING_SITE_VERIFICATION ? { 'msvalidate.01': env.BING_SITE_VERIFICATION } : undefined,
      },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': seoIds.website,
  name: app.name,
  alternateName: app.shortName,
  url: env.APP_URL,
  description: app.description,
  inLanguage: 'ja',
  publisher: { '@id': seoIds.organization },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="antialiased">
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Frame>{children}</Frame>
        </ThemeProvider>
      </body>
    </html>
  );
}
