// @vitest-environment node
import { promises as fs } from 'node:fs';

import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { GET as monthlyApi } from '@/app/api/competitions/monthly/results/route';
import { GET as monthlyYearsApi } from '@/app/api/competitions/monthly/results/years/route';
import { GET as rifleApi } from '@/app/api/competitions/rifle-shooting-class/results/route';
import { GET as rifleYearsApi } from '@/app/api/competitions/rifle-shooting-class/results/years/route';

import { getFiscalYears, getResults, groupResultsByDateAndEvent } from './competitions';
import {
  getRifleClassFiscalYears,
  getRifleClassResults,
  groupRifleClassResultsByDateAndEvent,
} from './rifle-shooting-class';

const cases = [
  {
    label: 'monthly',
    event: 'AR60S',
    second: 'AP60',
    get: getResults,
    years: getFiscalYears,
    group: groupResultsByDateAndEvent,
    api: monthlyApi,
    yearsApi: monthlyYearsApi,
  },
  {
    label: 'rifle class',
    event: 'BR40BR',
    second: 'BRF40',
    get: getRifleClassResults,
    years: getRifleClassFiscalYears,
    group: groupRifleClassResultsByDateAndEvent,
    api: rifleApi,
    yearsApi: rifleYearsApi,
  },
];

afterEach(() => vi.restoreAllMocks());

describe.each(cases)('$label result contracts', ({ event, second, get, years, group, api, yearsApi }) => {
  beforeEach(() => {
    vi.spyOn(fs, 'readFile').mockResolvedValue(
      [
        'date,event,rank,name,series,total,remarks',
        `2026-04-12,${second},1,Beta,90|91,181,`,
        `2026-04-12,${event},2,Alpha Second,80|81,161,`,
        `2026-04-12,${event},1,Alpha First,95|96,191,winner`,
        `2026-03-22,${event},1,Previous,90|90,180,`,
        '2026-04-12,ZZZ,1,Guest,90,90,',
      ].join('\n'),
    );
  });

  it('orders results by date, event and rank and combines all filters', async () => {
    const results = await get();
    expect(results.map((result) => result.name)).toEqual(['Alpha First', 'Alpha Second', 'Beta', 'Guest', 'Previous']);
    expect(await get({ year: 2026, date: '2026-04-12', event: event.toLowerCase(), name: 'FIRST' })).toEqual([
      results[0],
    ]);
    expect(await get({ year: 2024 })).toEqual([]);
    const grouped = group(results);
    expect([...grouped.keys()]).toEqual(['2026-04-12', '2026-03-22']);
    expect([...grouped.get('2026-04-12')!.keys()]).toEqual([event, second, 'ZZZ']);
    expect(
      grouped
        .get('2026-04-12')!
        .get(event)!
        .map((result) => result.rank),
    ).toEqual([1, 2]);
  });

  it('uses April as the fiscal-year boundary and counts dates separately from entries', async () => {
    const expected = [
      { year: 2026, count: 1, eventCount: 4, dateRange: { start: '2026-04-12', end: '2026-04-12' } },
      { year: 2025, count: 1, eventCount: 1, dateRange: { start: '2026-03-22', end: '2026-03-22' } },
    ];
    expect(await years()).toEqual(expected);
    const response = await yearsApi();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ data: expected, meta: { total: 2 } });
  });

  it('returns filtered API data, metadata and shared-cache headers', async () => {
    const query = new URLSearchParams({ year: '2026', date: '2026-04-12', event, name: 'Alpha' });
    const response = await api(new NextRequest(`https://example.test/results?${query}`));
    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toContain('s-maxage=3600');
    expect(await response.json()).toMatchObject({
      data: [{ name: 'Alpha First' }, { name: 'Alpha Second' }],
      meta: {
        total: 2,
        dates: 1,
        events: [event],
        fiscalYears: [2026],
        filters: { year: 2026, date: '2026-04-12', event, name: 'Alpha' },
      },
    });
    const unfiltered = await api(new NextRequest('https://example.test/results'));
    expect(await unfiltered.json()).toMatchObject({
      meta: { total: 5, fiscalYears: [2026, 2025], filters: { year: null, date: null, event: null, name: null } },
    });
  });

  it('rejects invalid filters before reading result files', async () => {
    const response = await api(new NextRequest('https://example.test/results?year=invalid'));
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ error: 'Validation error' });
    expect(fs.readFile).not.toHaveBeenCalled();
  });

  it('returns a generic server error when the result store cannot be read', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.mocked(fs.readFile).mockRejectedValue(new Error('private path unavailable'));
    const results = await api(new NextRequest('https://example.test/results'));
    const fiscalYears = await yearsApi();
    expect(results.status).toBe(500);
    expect(fiscalYears.status).toBe(500);
    expect(await results.json()).toMatchObject({ error: 'Internal server error' });
    expect(await fiscalYears.json()).toEqual({ error: 'Internal server error' });
  });
});
