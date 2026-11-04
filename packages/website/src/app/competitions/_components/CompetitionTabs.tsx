import Link from 'next/link';

import { getCompetitionPath, paths } from '@/config/paths';
import { COMPETITION_YEARS, CURRENT_COMPETITION_YEAR, type CompetitionYear } from '@/features/competitions/data';
import { cn } from '@/lib/utils';

export type CompetitionTabsProps = {
  year: CompetitionYear;
};

export function CompetitionTabs({ year }: CompetitionTabsProps) {
  return (
    <nav aria-label="大会年度" className="flex overflow-x-auto">
      {COMPETITION_YEARS.map((item) => {
        const isActive = item === year;
        return (
          <Link
            key={item}
            prefetch={false}
            href={
              item === CURRENT_COMPETITION_YEAR ? paths.main.competitions.getHref() : getCompetitionPath(item).getHref()
            }
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'hover:text-secondary shrink-0 px-4 py-3 text-sm font-medium transition-colors',
              isActive ? 'border-secondary text-secondary border-b-2' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {item}
          </Link>
        );
      })}
    </nav>
  );
}
