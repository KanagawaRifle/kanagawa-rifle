import { paths } from '@/config/paths';
import { CURRENT_COMPETITION_YEAR } from '@/features/competitions/data';
import { createPageMetadata } from '@/lib/metadata';

import { CompetitionPage } from './_components/CompetitionPage';

export const metadata = createPageMetadata({
  title: '大会日程・要項・結果',
  description: paths.main.competitions.description,
  path: paths.main.competitions.getHref(),
});

export default function Page() {
  return <CompetitionPage year={CURRENT_COMPETITION_YEAR} overview />;
}
