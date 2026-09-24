import { CURRENT_COMPETITION_YEAR } from '@/features/competitions/data';

import { CompetitionPage, getCompetitionMetadata } from './_components/CompetitionPage';

export const metadata = getCompetitionMetadata();

export default function Page() {
  return <CompetitionPage year={CURRENT_COMPETITION_YEAR} overview />;
}
