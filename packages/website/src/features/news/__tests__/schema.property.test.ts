import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { FrontMatterSchema, isValidSlug, NewsQuerySchema } from '../schema';

describe('news input properties', () => {
  it('preserves every valid pagination integer through query-string coercion', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100000 }), fc.integer({ min: 1, max: 128 }), (page, size) => {
        expect(NewsQuerySchema.parse({ page: String(page), size: String(size) })).toEqual({ page, size });
      }),
    );
  });

  it('rejects sizes outside the public API limit', () => {
    fc.assert(
      fc.property(fc.oneof(fc.integer({ max: 0 }), fc.integer({ min: 129 })), (size) => {
        expect(NewsQuerySchema.safeParse({ size }).success).toBe(false);
      }),
    );
  });

  it('never accepts path traversal or a path separator in a slug', () => {
    fc.assert(
      fc.property(fc.string(), fc.constantFrom('/', '\\', '\0', '../'), fc.string(), (prefix, separator, suffix) => {
        expect(isValidSlug(`${prefix}${separator}${suffix}`)).toBe(false);
      }),
    );
  });

  it('round-trips valid publication dates independently of local timezone', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('2000-01-01'), max: new Date('2099-12-31'), noInvalidDate: true }),
        (date) => {
          const published = date.toISOString();
          expect(FrontMatterSchema.parse({ title: '記事', published }).published.toISOString()).toBe(published);
        },
      ),
    );
  });
});
