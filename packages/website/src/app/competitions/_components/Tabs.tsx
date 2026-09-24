// packages/website/src/app/competitions/_components/Tabs.tsx

import Link from 'next/link';

import { COMPETITION_YEARS, CURRENT_COMPETITION_YEAR, type CompetitionYear } from '@/features/competitions/data';
import { cn } from '@/lib/utils';

export type TabsProps = {
  year: CompetitionYear;
};

export function Tabs({ year }: TabsProps) {
  return (
    <div className="flex overflow-x-auto">
      {COMPETITION_YEARS.map((item) => {
        const isActive = item === year;
        return (
          <Link
            key={item}
            href={`/competitions/${item === CURRENT_COMPETITION_YEAR ? '' : item}`}
            className={cn(
              'hover:text-secondary shrink-0 px-4 py-3 text-sm font-medium transition-colors',
              isActive ? 'border-secondary text-secondary border-b-2' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
}
