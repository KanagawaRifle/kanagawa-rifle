import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CompetitionDate } from '../components/CompetitionDate';
import { HomeCompetitionNotices } from '../components/HomeCompetitionNotices';
import {
  COMPETITION_YEARS,
  CURRENT_COMPETITION_YEAR,
  getCompetitions,
  getHomeCompetitionNotices,
  resolveCompetitionYear,
} from '../data';
import { formatCompetitionDate, getScheduleDates } from '../dates';
import { generateCompetitionJsonLd } from '../json-ld';
import { competitionScheduleSchema, competitionSchema, type Competition } from '../schema';

const organizer = { name: '協会', url: 'https://example.com' };

describe('published competition data', () => {
  it('preserves all 29 competitions across the five published fiscal years', () => {
    expect(COMPETITION_YEARS.map((year) => [year, getCompetitions(year).length])).toEqual([
      [2026, 4],
      [2025, 9],
      [2024, 8],
      [2023, 5],
      [2022, 3],
    ]);
    for (const year of COMPETITION_YEARS) {
      expect(() => competitionSchema.array().parse(getCompetitions(year))).not.toThrow();
    }
  });

  it('resolves only exact published year paths', () => {
    for (const year of COMPETITION_YEARS) expect(resolveCompetitionYear(String(year))).toBe(year);
    for (const value of ['2021', '2027', '02026', '2026x', '2026.0', '../2026', '']) {
      expect(resolveCompetitionYear(value)).toBeUndefined();
    }
  });

  it('keeps January through March events with their fiscal year', () => {
    expect(getCompetitions(2026)[0]?.date).toEqual({ kind: 'date', date: '2027-03-28' });
    expect(getCompetitions(2025)[0]?.date).toEqual({ kind: 'date', date: '2026-03-29' });
    expect(getCompetitions(2025)[1]?.date).toEqual({ kind: 'range', from: '2026-02-21', to: '2026-02-22' });
  });

  it('retains the published ambiguous multi-month description without inventing dates', () => {
    const schedule = getCompetitions(2025)[3]?.date;
    expect(schedule).toEqual({
      kind: 'description',
      lines: [
        '12月大会 12月6日（土）― 7日（日）',
        '1月大会 1月10日（土）― 11日（日）',
        '2月大会 2月15日（土）― 15日（日）',
      ],
    });
    expect(getScheduleDates(schedule)).toBeUndefined();
    render(<CompetitionDate schedule={schedule!} />);
    expect(screen.getByText('2月大会 2月15日（土）― 15日（日）')).toBeVisible();
  });

  it('keeps notices visible until an editor unpublishes them', () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2030-01-01T00:00:00Z'));
      expect(CURRENT_COMPETITION_YEAR).toBe(2026);
      expect(getHomeCompetitionNotices().map((item) => item.name)).toEqual(['第56回東日本ライフル射撃競技選手権大会']);
    } finally {
      vi.useRealTimers();
    }
  });

  it('uses the same published action URLs and statuses for home notices and the year page', () => {
    const notice = getHomeCompetitionNotices()[0]!;
    expect(notice).toBe(getCompetitions(2026)[2]);
    const results = notice.actions.find((action) => action.name === '成績')!;
    expect(results.disabled).not.toBe(true);
    expect(results.homeLabel).toBe('速報');
    render(<HomeCompetitionNotices competitions={getHomeCompetitionNotices()} />);
    expect(screen.getByRole('link', { name: '速報' })).toHaveAttribute('href', results.href);
    expect(screen.getByRole('link', { name: '射座割' })).toHaveAttribute('href', notice.actions[2]?.href);
    expect(screen.getAllByText('6月18日(木)')).toHaveLength(2);
    expect(screen.getByText('6月21日(日)')).toBeVisible();
  });
});

describe('competition schedule model', () => {
  it.each(['2026-02-29', '2026-02-30', '2026-13-01', '2026/6/18', '2026-06-18T10:00:00Z'])(
    'rejects invalid calendar dates and timestamp values: %s',
    (date) => {
      expect(competitionScheduleSchema.safeParse({ kind: 'date', date }).success).toBe(false);
    },
  );

  it('accepts leap days and cross-year ranges but rejects reversed ranges', () => {
    expect(competitionScheduleSchema.safeParse({ kind: 'date', date: '2024-02-29' }).success).toBe(true);
    expect(competitionScheduleSchema.safeParse({ kind: 'range', from: '2025-12-31', to: '2026-01-02' }).success).toBe(
      true,
    );
    expect(competitionScheduleSchema.safeParse({ kind: 'range', from: '2026-01-02', to: '2025-12-31' }).success).toBe(
      false,
    );
  });

  it('formats Japanese calendar dates without depending on the server timezone', () => {
    expect(formatCompetitionDate('2026-06-18')).toBe('6月18日(木)');
    expect(formatCompetitionDate('2027-03-28')).toBe('3月28日(日)');
    expect(getScheduleDates({ kind: 'range', from: '2025-12-31', to: '2026-01-02' })).toEqual({
      start: '2025-12-31',
      end: '2026-01-02',
    });
  });

  it('renders the original rescheduling announcement with a struck-through old date', () => {
    const schedule = getCompetitions(2025)[2]!.date!;
    const { container } = render(<CompetitionDate schedule={schedule} />);
    expect(container.textContent).toBe('12月14日（日）← 11月2日（日）');
    expect(container.querySelector('del')?.textContent).toBe('11月2日（日）');
    expect(getScheduleDates(schedule)).toEqual({ start: '2025-12-14', end: '2025-12-14' });
  });

  it('represents undetermined and cancelled schedules explicitly', () => {
    const undetermined = competitionScheduleSchema.parse({ kind: 'undetermined' });
    const cancelled = competitionScheduleSchema.parse({
      kind: 'cancelled',
      scheduled: { kind: 'date', date: '2026-06-18' },
    });
    const { container } = render(
      <>
        <CompetitionDate schedule={undetermined} />
        <CompetitionDate schedule={cancelled} />
      </>,
    );
    expect(container.textContent).toBe('未定6月18日(木) 中止');
    expect(container.querySelector('del')?.textContent).toBe('6月18日(木)');
    expect(getScheduleDates(undetermined)).toBeUndefined();
    expect(getScheduleDates({ kind: 'cancelled' })).toBeUndefined();
  });

  it('requires valid URLs for active actions and venues', () => {
    const competition = getCompetitions(2026)[0]!;
    expect(competitionSchema.safeParse({ ...competition, actions: [{ name: '申込' }] }).success).toBe(false);
    expect(competitionSchema.safeParse({ ...competition, actions: [{ name: '申込', href: 'invalid' }] }).success).toBe(
      false,
    );
    expect(competitionSchema.safeParse({ ...competition, actions: [{ name: '申込', disabled: true }] }).success).toBe(
      true,
    );
    expect(competitionSchema.safeParse({ ...competition, venue: { name: '会場', href: 'invalid' } }).success).toBe(
      false,
    );
  });
});

describe('competition structured data', () => {
  it('preserves date-only values and the dates of events in the next calendar year', () => {
    const events = generateCompetitionJsonLd(getCompetitions(2026), organizer);
    expect(events).toHaveLength(4);
    expect(events[0]).toMatchObject({ startDate: '2027-03-28', endDate: '2027-03-28' });
    expect(events[2]).toMatchObject({ startDate: '2026-06-18', endDate: '2026-06-21' });
  });

  it('omits unknown dates and represents cancellations without fabricating schedules', () => {
    const base: Competition = { name: '大会', grade: 'G4', actions: [] };
    const events = generateCompetitionJsonLd(
      [
        base,
        { ...base, date: { kind: 'undetermined' } },
        { ...base, date: { kind: 'description', lines: ['日程は大会要項参照'] } },
        { ...base, date: { kind: 'cancelled' } },
        { ...base, date: { kind: 'cancelled', scheduled: { kind: 'date', date: '2026-06-18' } } },
      ],
      organizer,
    );
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ startDate: '2026-06-18', eventStatus: 'https://schema.org/EventCancelled' });
  });
});
