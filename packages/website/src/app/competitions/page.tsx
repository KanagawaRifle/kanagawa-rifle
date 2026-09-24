import { paths } from '@/config/paths';
import { CompetitionPage } from '@/features/competitions/components/CompetitionPage';
import { CURRENT_COMPETITION_YEAR } from '@/features/competitions/data';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: paths.main.competitions.name,
  description: paths.main.competitions.description,
});

export default function Page() {
  return <CompetitionPage year={CURRENT_COMPETITION_YEAR} overview />;
}
