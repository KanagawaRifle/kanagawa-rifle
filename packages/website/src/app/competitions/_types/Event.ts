import { ReactNode } from 'react';

type Action = {
  name: string;
  href?: string | URL;
  disabled?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
};

type Venue = {
  name: string;
  href: string | URL;
};

type EventDate = {
  from: Date;
  to: Date;
};

export type DateValue = EventDate | ReactNode | Date | string;

export type Event = {
  name: string;
  grade: 'G4' | 'G3' | 'G3+' | 'G2' | 'G1';
  actions: Action[];
  date: DateValue;
  pet?: DateValue;
  deadline?: Date | string;
  venue: Venue;
};
