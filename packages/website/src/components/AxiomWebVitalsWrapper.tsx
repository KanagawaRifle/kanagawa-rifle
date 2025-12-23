'use client';

import { AxiomWebVitals } from 'next-axiom';
import { useEffect, useState } from 'react';

export function AxiomWebVitalsWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <AxiomWebVitals />;
}
