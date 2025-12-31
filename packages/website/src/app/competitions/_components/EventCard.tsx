// packages/website/src/app/competitions/_components/EventCard.tsx

import { AlarmClock, Calendar, Dumbbell, MapPin } from 'lucide-react';
import Link from 'next/link';
import React, { ReactNode } from 'react';

import { Button, ButtonGroup } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Event, DateValue } from '../_types';

interface ItemProps {
  icon: ReactNode;
  title: string;
  text: ReactNode;
  divider?: boolean;
}

function Item({ icon, title, text, divider = false }: ItemProps) {
  return (
    <li className={divider ? 'border-b border-border' : ''}>
      <div className="flex items-center gap-2 p-3">
        <span className="text-primary">{icon}</span>
        <span>
          {title}：{text}
        </span>
      </div>
    </li>
  );
}

const dateFormatter = new Intl.DateTimeFormat('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' });
const formatDate = (date: Date): string => dateFormatter.format(date);

function dateToElement(date: DateValue): ReactNode {
  if (typeof date === 'string') {
    return date;
  }

  if (date instanceof Date) {
    return formatDate(date);
  }

  if (React.isValidElement(date)) {
    return date;
  }

  // EventDateの型ガード
  if (date && typeof date === 'object' && 'from' in date && 'to' in date) {
    const eventDate = date;
    return `${formatDate(eventDate.from)} ― ${formatDate(eventDate.to)}`;
  }

  return 'undefined';
}

function convertHrefToString(href: string | URL | undefined): string {
  if (href instanceof URL) {
    return href.toString();
  }
  return String(href);
}

export function EventCard({ name, grade, actions, date, pet, deadline, venue }: Event) {
  return (
    <Card>
      <CardHeader>
        <p className="text-muted-foreground">{grade}大会</p>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ButtonGroup className="flex-wrap">
          {actions.map((action) => (
            <Button
              key={action.name}
              variant="outline"
              asChild={!action.disabled}
              disabled={action.disabled ?? false}
              aria-label={action.name}
            >
              {action.disabled ? (
                action.name
              ) : (
                <a
                  href={convertHrefToString(action.href)}
                  rel={action.target === '_blank' ? 'noopener noreferrer' : undefined}
                  target={action.target ?? '_blank'}
                >
                  {action.name}
                </a>
              )}
            </Button>
          ))}
        </ButtonGroup>
      </CardContent>
      {(date || pet || deadline || venue) && (
        <ul className="border-t border-border">
          {date && <Item icon={<Calendar className="h-5 w-5" />} title="期日" text={dateToElement(date)} divider />}
          {pet && <Item icon={<Dumbbell className="h-5 w-5" />} title="公式練習" text={dateToElement(pet)} divider />}
          {deadline && (
            <Item icon={<AlarmClock className="h-5 w-5" />} title="申込締切" text={dateToElement(deadline)} divider />
          )}
          {venue && (
            <Item
              icon={<MapPin className="h-5 w-5" />}
              title="会場"
              text={
                <Link
                  href={convertHrefToString(venue.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:bg-primary/10"
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
