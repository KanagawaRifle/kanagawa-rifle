import { describe, expect, it } from 'vitest';

import { createSecurityHeaders } from '../security-headers';

const production = { isDev: false, isVercel: false, isLhci: false, assetOrigins: ['https://cdn.example.test'] };

function headers(options = production) {
  return Object.fromEntries(createSecurityHeaders(options).map(({ key, value }) => [key, value]));
}

describe('security headers', () => {
  it('retains production restrictions and allows the configured asset host', () => {
    const result = headers();
    const csp = result['Content-Security-Policy'];
    expect(result['X-Frame-Options']).toBe('DENY');
    expect(result['X-Content-Type-Options']).toBe('nosniff');
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain('upgrade-insecure-requests');
    expect(csp).toContain('https://cdn.example.test');
    expect(csp).not.toContain('localhost');
    expect(csp).not.toContain('vercel.live');
  });

  it.each(['isDev', 'isLhci'] as const)('allows local HTTP only when %s is enabled', (flag) => {
    const csp = headers({ ...production, [flag]: true })['Content-Security-Policy'];
    expect(csp).not.toContain('upgrade-insecure-requests');
    expect(csp).toContain('http://localhost:*');
  });

  it('scopes Vercel preview integration to Vercel environments', () => {
    const csp = headers({ ...production, isVercel: true })['Content-Security-Policy'];
    expect(csp).toContain('https://vercel.live');
    expect(csp).toContain('wss://ws-us3.pusher.com');
    expect(csp).toContain('upgrade-insecure-requests');
  });

  it('allows eval only in development, including when production is served over local HTTP', () => {
    expect(headers({ ...production, isDev: true })['Content-Security-Policy']).toContain("'unsafe-eval'");
    expect(headers()['Content-Security-Policy']).not.toContain("'unsafe-eval'");
    expect(headers({ ...production, isLhci: true })['Content-Security-Policy']).not.toContain("'unsafe-eval'");
    expect(headers({ ...production, isVercel: true })['Content-Security-Policy']).not.toContain("'unsafe-eval'");
  });
});
