'use client';

import { RotateCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getNewsListHref } from '@/features/news/paths';

export function NewsListControls({ size }: { size: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const sizes = [...new Set([6, 12, 64, 128, size])].sort((a, b) => a - b);
  return (
    <div className="flex items-center justify-between">
      <Select
        value={String(size)}
        disabled={pending}
        onValueChange={(value) => startTransition(() => router.push(getNewsListHref({ size: Number(value) })))}
      >
        <SelectTrigger className="w-24" aria-label="表示件数">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sizes.map((value) => (
            <SelectItem key={value} value={String(value)}>
              {value}件
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <RefreshNewsButton />
    </div>
  );
}

export function RefreshNewsButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant="ghost"
      onClick={() => startTransition(() => router.refresh())}
      disabled={pending}
      aria-label="記事を更新"
    >
      <RotateCw className={`mr-2 h-4 w-4 ${pending ? 'animate-spin' : ''}`} />
      更新
    </Button>
  );
}
