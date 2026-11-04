'use client';

import { Loader2, Share2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { buttonVariants } from '@/components/ui/button-styles';

const ShareMenu = dynamic(() => import('./ShareMenu'), {
  loading: () => (
    <button
      type="button"
      className={buttonVariants({ variant: 'ghost' })}
      disabled
      aria-busy="true"
      aria-label="共有メニューを開く"
    >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      共有
    </button>
  ),
});

type Props = { url: string; title: string; loading?: boolean };

export default function ShareLinks(props: Props) {
  const [requested, setRequested] = useState(false);
  if (requested) return <ShareMenu {...props} />;
  return (
    <button
      type="button"
      className={buttonVariants({ variant: 'ghost' })}
      disabled={props.loading}
      aria-label="共有メニューを開く"
      aria-haspopup="menu"
      onClick={() => setRequested(true)}
    >
      <Share2 className="mr-2 h-4 w-4" />
      共有
    </button>
  );
}
