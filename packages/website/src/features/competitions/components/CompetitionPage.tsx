import { JsonLd } from '@/components/JsonLd';
import { PageLayout } from '@/components/PageLayout';
import { app } from '@/config/app';
import { env } from '@/config/env';
import { getCompetitionPath, paths } from '@/config/paths';
import { getCompetitions, type CompetitionYear } from '@/features/competitions/data';
import { generateCompetitionJsonLd } from '@/features/competitions/json-ld';

import { EntryFeeCard } from './EntryFeeCard';
import { EntryInfoCard } from './EntryInfoCard';
import { EventCard } from './EventCard';
import { Tabs } from './Tabs';

export function CompetitionPage({ year, overview = false }: { year: CompetitionYear; overview?: boolean }) {
  const currentPath = overview ? paths.main.competitions : getCompetitionPath(year);
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
        <JsonLd key={jsonLd.name} data={jsonLd} />
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
