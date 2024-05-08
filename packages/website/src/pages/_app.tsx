import '../styles/globals.scss';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { config } from "@fortawesome/fontawesome-svg-core";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Script from 'next/script';

import createEmotionCache from '@kanagawa-rifle/website/createEmotionCache';
import theme from '@kanagawa-rifle/website/theme';

import type { AppProps } from 'next/app';

import "@fortawesome/fontawesome-svg-core/styles.css";

const clientSideEmotionCache = createEmotionCache();

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string;
config.autoAddCss = false;

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) => {
  return (
    <>
      <Script async strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script id="ga-script" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default MyApp;
