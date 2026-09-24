// packages/website/src/app/layout.tsx

import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import React from 'react';
import { Toaster } from 'sonner';

import { Analytics } from '@/components/Analytics';
import { Frame } from '@/components/Frame';
import { JsonLd } from '@/components/JsonLd';
import { app } from '@/config/app';
import { env } from '@/config/env';
import { seoIds } from '@/config/seo';
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
};

// JSON-LD 構造化データ
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  '@id': seoIds.organization,
  name: app.name,
  legalName: app.longName,
  alternateName: [app.longName, app.shortName],
  description: app.description,
  url: env.APP_URL,
  logo: new URL('/web-app-manifest-512x512.png', env.APP_URL).toString(),
  sport: 'ライフル射撃',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: '神奈川県',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': seoIds.website,
  name: app.name,
  alternateName: app.shortName,
  url: env.APP_URL,
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
          <Toaster position="bottom-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
