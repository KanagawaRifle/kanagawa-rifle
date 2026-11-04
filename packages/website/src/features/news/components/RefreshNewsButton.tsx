'use client';

import { RotateCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { buttonVariants } from '@/components/ui/button-styles';

export function RefreshNewsButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      className={buttonVariants({ variant: 'ghost' })}
      onClick={() => startTransition(() => router.refresh())}
      disabled={pending}
      aria-label="記事を更新"
    >
      <RotateCw className={`mr-2 h-4 w-4 ${pending ? 'animate-spin' : ''}`} />
      更新
    </button>
  );
}
