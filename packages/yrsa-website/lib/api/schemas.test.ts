import { describe, it, expect } from 'vitest';

import { dateSchema, yearSchema, monthlyResultsQuerySchema, parseSearchParams } from './schemas';

describe('dateSchema', () => {
  it('should accept valid YYYY-MM-DD format', () => {
    const result = dateSchema.safeParse('2024-04-21');
    expect(result.success).toBe(true);
    expect(result.data).toBe('2024-04-21');
  });

  it('should reject invalid date formats', () => {
    expect(dateSchema.safeParse('2024/04/21').success).toBe(false);
    expect(dateSchema.safeParse('04-21-2024').success).toBe(false);
    expect(dateSchema.safeParse('2024-4-21').success).toBe(false);
  });

  it('should accept undefined (optional)', () => {
    const result = dateSchema.safeParse(undefined);
    expect(result.success).toBe(true);
  });
});

describe('yearSchema', () => {
  it('should accept valid 4-digit year', () => {
    const result = yearSchema.safeParse('2024');
    expect(result.success).toBe(true);
    expect(result.data).toBe(2024);
  });

  it('should reject invalid years', () => {
    expect(yearSchema.safeParse('24').success).toBe(false);
    expect(yearSchema.safeParse('abcd').success).toBe(false);
  });

  it('should reject years out of range', () => {
    expect(yearSchema.safeParse('1999').success).toBe(false);
    expect(yearSchema.safeParse('2101').success).toBe(false);
  });

  it('should accept undefined (optional)', () => {
    const result = yearSchema.safeParse(undefined);
    expect(result.success).toBe(true);
  });
});

describe('monthlyResultsQuerySchema', () => {
  it('should parse valid query parameters', () => {
    const result = monthlyResultsQuerySchema.safeParse({
      year: '2024',
      date: '2024-04-21',
      event: 'AR60S',
      name: '山田太郎',
    });

    expect(result).toEqual({
      success: true,
      data: {
        year: 2024,
        date: '2024-04-21',
        event: 'AR60S',
        name: '山田太郎',
      },
    });
  });

  it('should accept empty query', () => {
    const result = monthlyResultsQuerySchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid parameters', () => {
    const result = monthlyResultsQuerySchema.safeParse({
      year: 'invalid',
    });
    expect(result.success).toBe(false);
  });
});

describe('parseSearchParams', () => {
  it('should parse URLSearchParams correctly', () => {
    const params = new URLSearchParams('year=2024&event=AR60S');
    const result = parseSearchParams(params, monthlyResultsQuerySchema);

    expect(result).toEqual({
      success: true,
      data: { year: 2024, event: 'AR60S' },
    });
  });

  it('should return error for invalid params', () => {
    const params = new URLSearchParams('year=invalid');
    const result = parseSearchParams(params, monthlyResultsQuerySchema);

    expect(result).toEqual({
      success: false,
      error: expect.stringContaining('year'),
    });
  });

  it('should handle empty params', () => {
    const params = new URLSearchParams();
    const result = parseSearchParams(params, monthlyResultsQuerySchema);

    expect(result.success).toBe(true);
  });
});
