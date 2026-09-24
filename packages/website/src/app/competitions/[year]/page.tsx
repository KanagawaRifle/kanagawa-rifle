import { notFound } from 'next/navigation';

import { getCompetitionPath } from '@/config/paths';
import { CompetitionPage } from '@/features/competitions/components/CompetitionPage';
import { COMPETITION_YEARS, resolveCompetitionYear } from '@/features/competitions/data';
import { createPageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ year: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPETITION_YEARS.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({ params }: Props) {
  const year = resolveCompetitionYear((await params).year);
  if (!year) notFound();
  const path = getCompetitionPath(year);
  return createPageMetadata({ title: path.name, description: path.description });
}

export default async function Page({ params }: Props) {
  const year = resolveCompetitionYear((await params).year);
  if (!year) notFound();
  return <CompetitionPage year={year} />;
}
