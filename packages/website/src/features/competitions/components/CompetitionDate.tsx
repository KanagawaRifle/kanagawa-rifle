import { formatCompetitionDate } from '../dates';
import type { CompetitionSchedule } from '../schema';

export function CompetitionDate({
  schedule,
  rangeSeparator = ' ― ',
}: {
  schedule: CompetitionSchedule;
  rangeSeparator?: string;
}) {
  switch (schedule.kind) {
    case 'date':
      return <time dateTime={schedule.date}>{formatCompetitionDate(schedule.date)}</time>;
    case 'range':
      return (
        <>
          <time dateTime={schedule.from}>{formatCompetitionDate(schedule.from)}</time>
          {rangeSeparator}
          <time dateTime={schedule.to}>{formatCompetitionDate(schedule.to)}</time>
        </>
      );
    case 'rescheduled':
      return (
        <>
          <time dateTime={schedule.date}>
            {formatCompetitionDate(schedule.date).replace('(', '（').replace(')', '）')}
          </time>
          {'← '}
          <del>{formatCompetitionDate(schedule.previousDate).replace('(', '（').replace(')', '）')}</del>
        </>
      );
    case 'undetermined':
      return <>{schedule.label ?? '未定'}</>;
    case 'cancelled':
      return (
        <>
          {schedule.scheduled && (
            <>
              <del>
                <CompetitionDate schedule={schedule.scheduled} rangeSeparator={rangeSeparator} />
              </del>{' '}
            </>
          )}
          {schedule.label ?? '中止'}
        </>
      );
    case 'description':
      return (
        <div>
          {schedule.lines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      );
  }
}
