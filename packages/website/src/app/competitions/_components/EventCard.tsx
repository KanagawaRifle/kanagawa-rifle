// packages/website/src/app/competitions/_components/EventCard.tsx

import { AlarmClock, Calendar, Dumbbell, MapPin } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompetitionActions } from '@/features/competitions/components/CompetitionActions';
import { CompetitionDate } from '@/features/competitions/components/CompetitionDate';
import type { Competition } from '@/features/competitions/schema';

interface ItemProps {
  icon: ReactNode;
  title: string;
  text: ReactNode;
  divider?: boolean;
}

function Item({ icon, title, text, divider = false }: ItemProps) {
  return (
    <li className={divider ? 'border-border border-b' : ''}>
      <div className="flex items-center gap-2 p-3">
        <span className="text-primary">{icon}</span>
        <span>
          {title}：{text}
        </span>
      </div>
    </li>
  );
}

export function EventCard({ name, grade, actions, date, pet, deadline, venue }: Competition) {
  return (
    <Card>
      <CardHeader>
        <p className="text-muted-foreground">{grade}大会</p>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CompetitionActions actions={actions} />
      </CardContent>
      {(date || pet || deadline || venue) && (
        <ul className="border-border border-t">
          {date && (
            <Item
              icon={<Calendar className="h-5 w-5" />}
              title="期日"
              text={<CompetitionDate schedule={date} />}
              divider
            />
          )}
          {pet && (
            <Item
              icon={<Dumbbell className="h-5 w-5" />}
              title="公式練習"
              text={<CompetitionDate schedule={pet} />}
              divider
            />
          )}
          {deadline && (
            <Item
              icon={<AlarmClock className="h-5 w-5" />}
              title="申込締切"
              text={<CompetitionDate schedule={{ kind: 'date', date: deadline }} />}
              divider
            />
          )}
          {venue && (
            <Item
              icon={<MapPin className="h-5 w-5" />}
              title="会場"
              text={
                <Link
                  href={venue.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:bg-primary/10 underline"
                >
                  {venue.name}
                </Link>
              }
            />
          )}
        </ul>
      )}
    </Card>
  );
}
