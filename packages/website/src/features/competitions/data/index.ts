import 'server-only';

import { year2022 } from './year2022';
import { year2023 } from './year2023';
import { year2024 } from './year2024';
import { year2025 } from './year2025';
import { year2026 } from './year2026';

const competitionsByYear = {
  2026: year2026,
  2025: year2025,
  2024: year2024,
  2023: year2023,
  2022: year2022,
};

export type CompetitionYear = keyof typeof competitionsByYear;
export const COMPETITION_YEARS = Object.keys(competitionsByYear)
  .map((year) => Number(year) as CompetitionYear)
  .sort((a, b) => b - a);

// The published fiscal year is an editorial choice, independent of today's date.
export const CURRENT_COMPETITION_YEAR = 2026 satisfies CompetitionYear;

export function resolveCompetitionYear(value: string): CompetitionYear | undefined {
  return COMPETITION_YEARS.find((year) => String(year) === value);
}

export function getCompetitions(year: CompetitionYear) {
  return competitionsByYear[year];
}

export function getHomeCompetitionNotices() {
  return getCompetitions(CURRENT_COMPETITION_YEAR).filter((competition) => competition.homeNotice?.published);
}
