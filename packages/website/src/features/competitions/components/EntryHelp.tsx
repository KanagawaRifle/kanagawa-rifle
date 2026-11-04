'use client';

import { CircleHelp } from 'lucide-react';
import { lazy, Suspense, useState } from 'react';

import { buttonVariants } from '@/components/ui/button-styles';

const EntryHelpDialog = lazy(() => import('./EntryHelpDialog'));

export function EntryHelp() {
  const [requested, setRequested] = useState(false);
  const trigger = (
    <button
      type="button"
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      aria-label="申込フォームの説明"
      aria-haspopup="dialog"
      aria-busy={requested || undefined}
      disabled={requested}
      onClick={() => setRequested(true)}
    >
      <CircleHelp className="h-5 w-5" />
    </button>
  );
  return requested ? (
    <Suspense fallback={trigger}>
      <EntryHelpDialog />
    </Suspense>
  ) : (
    trigger
  );
}
