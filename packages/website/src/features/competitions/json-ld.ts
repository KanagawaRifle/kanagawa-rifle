import { getScheduleDates } from './dates';
import type { Competition } from './schema';

export function generateCompetitionJsonLd(
  competitions: Competition[],
  organizer: { '@id'?: string; name: string; url: string },
) {
  return competitions.flatMap((competition) => {
    const dates = getScheduleDates(competition.date);
    if (!dates) return [];

    return [
      {
        '@context': 'https://schema.org',
        '@type': 'SportsEvent',
        name: competition.name,
        startDate: dates.start,
        endDate: dates.end,
        eventStatus:
          competition.date?.kind === 'cancelled'
            ? 'https://schema.org/EventCancelled'
            : competition.date?.kind === 'rescheduled'
              ? 'https://schema.org/EventRescheduled'
              : 'https://schema.org/EventScheduled',
        ...(competition.date?.kind === 'rescheduled' ? { previousStartDate: competition.date.previousDate } : {}),
        sport: 'ライフル射撃',
        organizer: { '@type': 'SportsOrganization', ...organizer },
        location: competition.venue
          ? {
              '@type': 'Place',
              name: competition.venue.name,
              url: competition.venue.href,
            }
          : undefined,
      },
    ];
  });
}
