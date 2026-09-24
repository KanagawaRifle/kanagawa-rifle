// packages/website/src/app/layout.tsx

import '@/styles/globals.css';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import React from 'react';
import { Toaster } from 'sonner';

import { Frame } from '@/components';
import { AxiomWebVitalsWrapper } from '@/components/AxiomWebVitalsWrapper';
import { app, env } from '@/config';
import { ThemeProvider } from '@/providers/ThemeProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: {
    default: app.name,
    template: `%s：${app.name}`,
  },
  description: app.description,
  keywords: [
    '射撃',
    'ライフル射撃',
    'ライフル',
    '神奈川県',
    'スポーツ',
    '競技',
    '大会',
    '協会',
    'エアライフル',
    'ビームライフル',
  ],
  formatDetection: { telephone: false },
  metadataBase: new URL(env.APP_URL),
  alternates: {
    canonical: './',
  },
  appleWebApp: {
    title: app.name,
  },
  openGraph: { images: new URL(`/api/og?title=${app.name}`, env.APP_URL) },
  twitter: { images: new URL(`/api/og?title=${app.name}`, env.APP_URL) },
};

// JSON-LD 構造化データ
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: app.name,
  alternateName: [app.longName, app.shortName],
  description: app.description,
  url: env.APP_URL,
  sport: 'ライフル射撃',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: '神奈川県',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: app.name,
  url: env.APP_URL,
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      {process.env.NODE_ENV === 'production' && env.CLARITY_ID && (
        <Script strategy="afterInteractive" id="clarity-tag">
          {`
            (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${env.CLARITY_ID}");
          `}
        </Script>
      )}
      {process.env.NODE_ENV === 'production' && <AxiomWebVitalsWrapper />}
      <body className="antialiased">
        {process.env.NODE_ENV === 'production' && env.GOOGLE_ANALYTICS_ID && (
          <GoogleTagManager gtmId={env.GOOGLE_ANALYTICS_ID} />
        )}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Frame>{children}</Frame>
          <Toaster position="bottom-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
