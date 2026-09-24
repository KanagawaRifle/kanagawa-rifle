'use client';

import { AxiomWebVitals } from 'next-axiom';

import { useHydrated } from '@/hooks/useHydrated';

export function AxiomWebVitalsWrapper() {
  const isMounted = useHydrated();

  if (!isMounted) {
    return null;
  }

  return <AxiomWebVitals />;
}
