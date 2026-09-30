import { JsonLd } from '@/components/JsonLd';
import { PageLayout } from '@/components/PageLayout';
import { PageLinks } from '@/components/PageLinks';
import { app } from '@/config/app';
import { env } from '@/config/env';
import { getCompetitionPath, paths } from '@/config/paths';
import { seoIds } from '@/config/seo';
import { EntryFeeCard } from '@/features/competitions/components/EntryFeeCard';
import { EntryInfoCard } from '@/features/competitions/components/EntryInfoCard';
import { EventCard } from '@/features/competitions/components/EventCard';
import { getCompetitions, type CompetitionYear } from '@/features/competitions/data';
import { generateCompetitionJsonLd } from '@/features/competitions/json-ld';

import { CompetitionTabs } from './CompetitionTabs';

export function CompetitionPage({ year, overview = false }: { year: CompetitionYear; overview?: boolean }) {
  const currentPath = overview ? paths.main.competitions : getCompetitionPath(year);
  const competitions = getCompetitions(year);
  const eventJsonLd = generateCompetitionJsonLd(competitions, {
    '@id': seoIds.organization,
    name: app.name,
    url: env.APP_URL,
  });

  return (
    <PageLayout
      title={currentPath.title ?? currentPath.name}
      page={{ path: currentPath.getHref(), description: currentPath.description, type: 'CollectionPage' }}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        ...(!overview ? [{ name: paths.main.competitions.name, path: paths.main.competitions.getHref() }] : []),
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      <p>{currentPath.description}</p>
      {eventJsonLd.map((jsonLd) => (
        <JsonLd key={jsonLd.name} data={jsonLd} />
      ))}
      <CompetitionTabs year={year} />
      {overview && (
        <>
          <EntryInfoCard />
          <EntryFeeCard />
        </>
      )}
      {competitions.map((competition) => (
        <EventCard key={competition.name} {...competition} />
      ))}
      {overview && <PageLinks pages={[paths.sub.forms, paths.main.news, paths.main.projects]} />}
    </PageLayout>
  );
}
