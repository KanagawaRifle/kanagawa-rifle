'use client';

import dynamic from 'next/dynamic';

const MathStylesheet = dynamic(() => import('./MathStylesheet'));

// A separate dynamic entry keeps math CSS and fonts out of articles without formulas.
export default function MathStyles() {
  return <MathStylesheet />;
}
