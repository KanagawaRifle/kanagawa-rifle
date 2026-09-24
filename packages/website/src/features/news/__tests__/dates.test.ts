import { describe, expect, it } from 'vitest';

import { formatNewsDate } from '../dates';

describe('news publication dates', () => {
  it('uses the Japanese calendar day for timestamps around midnight', () => {
    expect(formatNewsDate(new Date('2026-01-01T14:59:59Z'))).toBe('2026年1月1日');
    expect(formatNewsDate(new Date('2026-01-01T15:00:00Z'))).toBe('2026年1月2日');
  });
});
