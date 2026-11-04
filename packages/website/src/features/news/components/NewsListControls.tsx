'use client';

import { ChevronDown } from 'lucide-react';
import { lazy, Suspense, useId, useState } from 'react';

import { selectTriggerClassName } from '@/components/ui/select-styles';

import { RefreshNewsButton } from './RefreshNewsButton';

function PageSizeTrigger({ size, listboxId, onOpen }: { size: number; listboxId: string; onOpen?: () => void }) {
  return (
    <button
      type="button"
      role="combobox"
      aria-label="表示件数"
      aria-expanded="false"
      aria-controls={listboxId}
      aria-haspopup="listbox"
      aria-busy={!onOpen || undefined}
      disabled={!onOpen}
      className={`${selectTriggerClassName} w-24`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          onOpen?.();
        }
      }}
    >
      <span>{size}件</span>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

// Declared once: rerenders do not recreate the lazy component or reset focus.
const NewsPageSizeSelect = lazy(() => import('./NewsPageSizeSelect'));

export function NewsListControls({ size }: { size: number }) {
  const listboxId = useId();
  const [requested, setRequested] = useState(false);
  return (
    <div className="flex items-center justify-between">
      {requested ? (
        <Suspense fallback={<PageSizeTrigger listboxId={listboxId} size={size} />}>
          <NewsPageSizeSelect listboxId={listboxId} size={size} />
        </Suspense>
      ) : (
        <PageSizeTrigger listboxId={listboxId} size={size} onOpen={() => setRequested(true)} />
      )}
      <RefreshNewsButton />
    </div>
  );
}
