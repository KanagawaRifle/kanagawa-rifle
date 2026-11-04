'use client';

import dynamic from 'next/dynamic';

const AxiomWebVitals = dynamic(() => import('next-axiom').then((module) => module.AxiomWebVitals), { ssr: false });

export function AxiomWebVitalsWrapper() {
  return <AxiomWebVitals />;
}
