'use client';

import Script from 'next/script';

export default function Clarity({ id }: { id: string }) {
  return (
    <Script strategy="afterInteractive" id="clarity-tag">
      {`
        (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", ${JSON.stringify(id).replace(/</g, '\\u003c')});
      `}
    </Script>
  );
}
