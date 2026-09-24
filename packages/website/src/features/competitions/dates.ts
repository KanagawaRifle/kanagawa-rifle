import type { CompetitionSchedule } from './schema';

const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  month: 'long',
  day: 'numeric',
  weekday: 'short',
  timeZone: 'Asia/Tokyo',
});

export function formatCompetitionDate(date: string): string {
  return dateFormatter.format(new Date(`${date}T00:00:00+09:00`));
}

export function getScheduleDates(schedule?: CompetitionSchedule): { start: string; end: string } | undefined {
  switch (schedule?.kind) {
    case 'date':
    case 'rescheduled':
      return { start: schedule.date, end: schedule.date };
    case 'range':
      return { start: schedule.from, end: schedule.to };
    case 'cancelled':
      return getScheduleDates(schedule.scheduled);
    default:
      return undefined;
  }
}
