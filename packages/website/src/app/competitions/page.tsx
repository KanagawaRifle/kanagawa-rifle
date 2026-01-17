// packages/website/src/app/competitions/page.tsx

import type { Metadata } from 'next';
import React from 'react';

import { PageLayout } from '@/components';
import { app, env, paths } from '@/config';

import { EntryInfoCard, EntryFeeCard, EventCard, Tabs } from './_components';
import { year2026 } from './_databases';
import type { Event, DateValue } from './_types';

const currentPath = paths.main.competitions;
export const metadata: Metadata = {
  title: currentPath.name,
  description: currentPath.description,
  openGraph: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
  twitter: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
};

// 日付をISO形式に変換するヘルパー
function formatDateForJsonLd(date: DateValue | undefined): string | undefined {
  if (!date) return undefined;
  if (date instanceof Date) return date.toISOString().split('T')[0];
  if (typeof date === 'object' && 'from' in date && date.from instanceof Date) {
    return date.from.toISOString().split('T')[0];
  }
  return undefined;
}

function getEndDate(date: DateValue | undefined): string | undefined {
  if (!date) return undefined;
  if (date instanceof Date) return date.toISOString().split('T')[0];
  if (typeof date === 'object' && 'to' in date && date.to instanceof Date) {
    return date.to.toISOString().split('T')[0];
  }
  return undefined;
}

// Event JSON-LD を生成
function generateEventJsonLd(events: Event[]) {
  return events
    .filter((event) => formatDateForJsonLd(event.date))
    .map((event) => ({
      '@context': 'https://schema.org',
      '@type': 'SportsEvent',
      name: event.name,
      startDate: formatDateForJsonLd(event.date),
      endDate: getEndDate(event.date),
      sport: 'ライフル射撃',
      organizer: {
        '@type': 'SportsOrganization',
        name: app.name,
        url: env.APP_URL,
      },
      location: event.venue
        ? {
            '@type': 'Place',
            name: event.venue.name,
            url: event.venue.href?.toString(),
          }
        : undefined,
    }));
}

export default function Page() {
  const eventJsonLd = generateEventJsonLd(year2026);

  return (
    <PageLayout
      title={currentPath.name}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      {eventJsonLd.map((jsonLd, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}

      <Tabs year={2026} />

      <EntryInfoCard />
      <EntryFeeCard />

      {year2026.map((event) => (
        <EventCard
          key={event.name}
          name={event.name}
          actions={event.actions}
          grade={event.grade}
          date={event.date}
          pet={event.pet}
          deadline={event.deadline}
          venue={event.venue}
        />
      ))}
    </PageLayout>
  );
}
