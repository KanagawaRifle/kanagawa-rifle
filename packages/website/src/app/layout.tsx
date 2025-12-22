// packages/website/src/app/layout.tsx

import '@/styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import Script from 'next/script';
import { AxiomWebVitals } from 'next-axiom';
import React from 'react';

import { Frame } from '@/components';
import { env, app } from '@/config';
import QueryProvider from '@/providers/QueryProvider';
import theme from '@/theme';

export const metadata: Metadata = {
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
  openGraph: { images: new URL(`/api/og?title=${app.name}`, env.APP_URL) },
  twitter: { images: new URL(`/api/og?title=${app.name}`, env.APP_URL) },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
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
      {process.env.NODE_ENV === 'production' && <AxiomWebVitals />}
      <body className="antialiased">
        {process.env.NODE_ENV === 'production' && env.GOOGLE_ANALYTICS_ID && (
          <GoogleTagManager gtmId={env.GOOGLE_ANALYTICS_ID} />
        )}
        <QueryProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Frame>{children}</Frame>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
