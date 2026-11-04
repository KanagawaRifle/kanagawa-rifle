'use client';

import dynamic from 'next/dynamic';

// A client boundary is required for Next.js to split these optional providers.
const GoogleTagManager = dynamic(() => import('@next/third-parties/google').then((module) => module.GoogleTagManager), {
  ssr: false,
});
const Clarity = dynamic(() => import('./Clarity'), { ssr: false });

export function AnalyticsProviders({
  clarityId,
  googleTagManagerId,
}: {
  clarityId?: string;
  googleTagManagerId?: string;
}) {
  return (
    <>
      {clarityId && <Clarity id={clarityId} />}
      {googleTagManagerId && <GoogleTagManager gtmId={googleTagManagerId} />}
    </>
  );
}
