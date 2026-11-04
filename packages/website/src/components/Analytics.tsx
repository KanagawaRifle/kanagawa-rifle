import { config as axiomConfig } from 'next-axiom/dist/config';

import { env } from '@/config/env';

import { AnalyticsProviders } from './AnalyticsProviders';
import { AxiomWebVitalsWrapper } from './AxiomWebVitalsWrapper';

export function Analytics() {
  if (process.env.NODE_ENV !== 'production') return null;
  return (
    <>
      {(env.CLARITY_ID || env.GOOGLE_ANALYTICS_ID) && (
        <AnalyticsProviders clarityId={env.CLARITY_ID} googleTagManagerId={env.GOOGLE_ANALYTICS_ID} />
      )}
      {axiomConfig.isEnvVarsSet() && <AxiomWebVitalsWrapper />}
    </>
  );
}
