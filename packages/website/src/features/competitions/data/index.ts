import { year2022 } from './year2022';
import { year2023 } from './year2023';
import { year2024 } from './year2024';
import { year2025 } from './year2025';
import { year2026 } from './year2026';

// The published fiscal year is an editorial choice, independent of today's calendar date.
export const CURRENT_COMPETITION_YEAR = 2026;
export const COMPETITION_YEARS = [2026, 2025, 2024, 2023, 2022] as const;
export type CompetitionYear = (typeof COMPETITION_YEARS)[number];

const competitionsByYear = {
  2026: year2026,
  2025: year2025,
  2024: year2024,
  2023: year2023,
  2022: year2022,
};

export function resolveCompetitionYear(value: string): CompetitionYear | undefined {
  return COMPETITION_YEARS.find((year) => String(year) === value);
}

export function getCompetitions(year: CompetitionYear) {
  return competitionsByYear[year];
}

export function getHomeCompetitionNotices() {
  return getCompetitions(CURRENT_COMPETITION_YEAR).filter((competition) => competition.homeNotice?.published);
}

export { COMPETITION_ENTRY_FORM_URL } from '../entry';
