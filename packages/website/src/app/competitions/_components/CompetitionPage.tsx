import type { Metadata } from 'next';

import { PageLayout } from '@/components';
import { app, env, paths } from '@/config';
import { getCompetitions, type CompetitionYear } from '@/features/competitions/data';
import { generateCompetitionJsonLd } from '@/features/competitions/json-ld';

import { EntryFeeCard } from './EntryFeeCard';
import { EntryInfoCard } from './EntryInfoCard';
import { EventCard } from './EventCard';
import { Tabs } from './Tabs';

function getCompetitionPath(year?: CompetitionYear) {
  return year ? paths.main.competitions.children[`year${year}`] : paths.main.competitions;
}

export function getCompetitionMetadata(year?: CompetitionYear): Metadata {
  const currentPath = getCompetitionPath(year);
  const images = new URL(`/api/og?title=${currentPath.name}`, env.APP_URL);
  return {
    title: currentPath.name,
    description: currentPath.description,
    openGraph: { images },
    twitter: { images },
  };
}

export function CompetitionPage({ year, overview = false }: { year: CompetitionYear; overview?: boolean }) {
  const currentPath = getCompetitionPath(overview ? undefined : year);
  const competitions = getCompetitions(year);
  const eventJsonLd = generateCompetitionJsonLd(competitions, { name: app.name, url: env.APP_URL });

  return (
    <PageLayout
      title={currentPath.name}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        ...(!overview ? [{ name: paths.main.competitions.name, path: paths.main.competitions.getHref() }] : []),
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      {eventJsonLd.map((jsonLd) => (
        <script
          key={jsonLd.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      ))}
      <Tabs year={year} />
      {overview && (
        <>
          <EntryInfoCard />
          <EntryFeeCard />
        </>
      )}
      {competitions.map((competition) => (
        <EventCard key={competition.name} {...competition} />
      ))}
    </PageLayout>
  );
}
