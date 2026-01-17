// packages/website/src/app/competitions/_components/Tabs.tsx

import Link from 'next/link';

import { cn } from '@/lib/utils';

export type TabsProps = {
  year: number;
};

const YEARS = [2026, 2025, 2024, 2023, 2022] as const;

export function Tabs({ year }: TabsProps) {
  return (
    <div className="flex overflow-x-auto">
      {YEARS.map((item) => {
        const isActive = item === year;
        return (
          <Link
            key={item}
            href={`/competitions/${item === 2026 ? '' : item}`}
            className={cn(
              'shrink-0 px-4 py-3 text-sm font-medium transition-colors hover:text-secondary',
              isActive
                ? 'border-b-2 border-secondary text-secondary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
}
