// packages/website/src/app/competitions/page.tsx

import type { Metadata } from 'next';
import React from 'react';

import { PageLayout } from '@/components';
import { env, paths } from '@/config';

import { EntryInfoCard, EntryFeeCard, EventCard, Tabs } from './_components';
import { year2025 } from './_databases';

const currentPath = paths.main.competitions;
export const metadata: Metadata = {
  title: currentPath.name,
  description: currentPath.description,
  openGraph: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
  twitter: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
};

export default function Page() {
  return (
    <PageLayout
      title={currentPath.name}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      <Tabs year={2025} />

      <EntryInfoCard />
      <EntryFeeCard />

      {year2025.map((event) => (
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
