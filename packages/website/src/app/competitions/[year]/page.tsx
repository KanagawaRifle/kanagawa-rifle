import { notFound } from 'next/navigation';

import { COMPETITION_YEARS, resolveCompetitionYear } from '@/features/competitions/data';

import { CompetitionPage, getCompetitionMetadata } from '../_components/CompetitionPage';

type Props = { params: Promise<{ year: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPETITION_YEARS.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({ params }: Props) {
  const year = resolveCompetitionYear((await params).year);
  if (!year) notFound();
  return getCompetitionMetadata(year);
}

export default async function Page({ params }: Props) {
  const year = resolveCompetitionYear((await params).year);
  if (!year) notFound();
  return <CompetitionPage year={year} />;
}
