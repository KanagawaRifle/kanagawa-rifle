import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Analytics } from '../Analytics';

const { isEnvVarsSet, providerEnv } = vi.hoisted(() => ({
  isEnvVarsSet: vi.fn(),
  providerEnv: { CLARITY_ID: '', GOOGLE_ANALYTICS_ID: '' },
}));
vi.mock('next-axiom/dist/config', () => ({ config: { isEnvVarsSet } }));
vi.mock('@/config/env', () => ({ env: providerEnv }));
vi.mock('../AnalyticsProviders', () => ({
  AnalyticsProviders: ({ clarityId, googleTagManagerId }: { clarityId?: string; googleTagManagerId?: string }) => (
    <span data-testid="providers" data-clarity={clarityId} data-gtm={googleTagManagerId} />
  ),
}));
vi.mock('../AxiomWebVitalsWrapper', () => ({
  AxiomWebVitalsWrapper: () => <span data-testid="web-vitals" />,
}));

describe('configured analytics', () => {
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'production');
    isEnvVarsSet.mockReset();
    providerEnv.CLARITY_ID = '';
    providerEnv.GOOGLE_ANALYTICS_ID = '';
  });
  afterEach(() => vi.unstubAllEnvs());

  it('omits monitoring when the provider has no destination', () => {
    isEnvVarsSet.mockReturnValue(false);
    const { container } = render(<Analytics />);
    expect(container).toBeEmptyDOMElement();
  });

  it('retains Web Vitals when any supported provider configuration is enabled', () => {
    isEnvVarsSet.mockReturnValue(true);
    render(<Analytics />);
    expect(screen.getByTestId('web-vitals')).toBeInTheDocument();
  });

  it.each([
    ['clarity-test', ''],
    ['', 'GTM-TEST'],
    ['clarity-test', 'GTM-TEST'],
  ])('passes configured analytics IDs to the deferred providers (%s, %s)', (clarityId, googleTagManagerId) => {
    providerEnv.CLARITY_ID = clarityId;
    providerEnv.GOOGLE_ANALYTICS_ID = googleTagManagerId;
    render(<Analytics />);
    expect(screen.getByTestId('providers')).toHaveAttribute('data-clarity', clarityId);
    expect(screen.getByTestId('providers')).toHaveAttribute('data-gtm', googleTagManagerId);
  });

  it('keeps development free of production analytics even when configured', () => {
    vi.stubEnv('NODE_ENV', 'development');
    isEnvVarsSet.mockReturnValue(true);
    const { container } = render(<Analytics />);
    expect(container).toBeEmptyDOMElement();
  });
});
