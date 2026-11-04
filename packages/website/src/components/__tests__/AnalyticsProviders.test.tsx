import { runInNewContext } from 'node:vm';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AnalyticsProviders } from '../AnalyticsProviders';
import Clarity from '../Clarity';

vi.mock('@next/third-parties/google', () => ({
  GoogleTagManager: ({ gtmId }: { gtmId: string }) => <span data-testid="gtm" data-id={gtmId} />,
}));
vi.mock('next/script', () => ({
  default: ({ id, strategy, children }: { id: string; strategy: string; children: string }) => (
    <script id={id} data-testid={id} data-strategy={strategy} type="text/plain">
      {children}
    </script>
  ),
}));

describe('deferred analytics providers', () => {
  it('renders no provider when both destinations are absent', () => {
    const { container } = render(<AnalyticsProviders />);
    expect(container).toBeEmptyDOMElement();
  });

  it.each([
    ['clarity-test', ''],
    ['', 'GTM-TEST'],
    ['clarity-test', 'GTM-TEST'],
  ])('loads only the configured providers (%s, %s)', async (clarityId, googleTagManagerId) => {
    render(<AnalyticsProviders clarityId={clarityId} googleTagManagerId={googleTagManagerId} />);
    const clarity = clarityId ? await screen.findByTestId('clarity-tag') : screen.queryByTestId('clarity-tag');
    const gtm = googleTagManagerId ? await screen.findByTestId('gtm') : screen.queryByTestId('gtm');
    expect(clarity?.getAttribute('data-strategy')).toBe(clarityId ? 'afterInteractive' : undefined);
    expect(gtm?.getAttribute('data-id')).toBe(googleTagManagerId || undefined);
  });
});

describe('Clarity initialization', () => {
  it.each(['clarity-test', 'id"</script><script>unexpected()</script>'])('preserves the ID as data: %s', (id) => {
    render(<Clarity id={id} />);
    const script = screen.getByTestId('clarity-tag').textContent!;
    expect(script).not.toContain('</script>');
    const insertBefore = vi.fn();
    const anchor = { parentNode: { insertBefore } };
    const tracker = document.createElement('script');
    runInNewContext(script, {
      window: {},
      document: {
        createElement: () => tracker,
        getElementsByTagName: () => [anchor],
      },
    });
    expect(tracker.getAttribute('src')).toBe(`https://www.clarity.ms/tag/${id}`);
    expect(tracker.async).toBeTruthy();
    expect(insertBefore).toHaveBeenCalledExactlyOnceWith(tracker, anchor);
  });
});
