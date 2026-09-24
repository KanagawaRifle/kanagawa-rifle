import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';

import { env } from '@/config/env';

import { AxiomWebVitalsWrapper } from './AxiomWebVitalsWrapper';

export function Analytics() {
  if (process.env.NODE_ENV !== 'production') return null;
  return (
    <>
      {env.CLARITY_ID && (
        <Script strategy="afterInteractive" id="clarity-tag">
          {`
            (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", ${JSON.stringify(env.CLARITY_ID).replace(/</g, '\\u003c')});
          `}
        </Script>
      )}
      <AxiomWebVitalsWrapper />
      {env.GOOGLE_ANALYTICS_ID && <GoogleTagManager gtmId={env.GOOGLE_ANALYTICS_ID} />}
    </>
  );
}
