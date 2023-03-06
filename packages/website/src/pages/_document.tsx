import React from 'react';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '@kanagawa-rifle/website/createEmotionCache';
import theme from '@kanagawa-rifle/website/theme';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

import type { EmotionCache } from '@emotion/react';
import type { AppPropsType, AppType } from 'next/dist/shared/lib/utils';

type MyDocumentProps = {
  emotionStyleTags: EmotionJSX.Element[];
};

export default class MyDocument extends Document<MyDocumentProps> {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/favicon.ico" />

          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&family=Roboto:wght@300&display=swapp"
            rel="stylesheet"
          />
          <meta name="emotion-insertion-point" content="" />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  // `getInitialProps` belongs to `_document` (instead of `_app`),
  // it's compatible with static-site generation (SSG).
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () => {
      return originalRenderPage({
        enhanceApp: (App: AppType | React.ComponentType<{ emotionCache: EmotionCache }>) => {
          const EnhanceApp = (props: AppPropsType) => <App emotionCache={cache} {...props} />;
          return EnhanceApp;
        },
      });
    };
    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents Emotion to render invalid HTML.
    // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      emotionStyleTags,
    };
  }
}
