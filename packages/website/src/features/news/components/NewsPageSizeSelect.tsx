'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getNewsListHref } from '@/features/news/paths';

export default function NewsPageSizeSelect({ size, listboxId }: { size: number; listboxId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const sizes = [...new Set([6, 12, 64, 128, size])].sort((a, b) => a - b);
  return (
    <Select
      defaultOpen
      value={String(size)}
      disabled={pending}
      onValueChange={(value) => startTransition(() => router.push(getNewsListHref({ size: Number(value) })))}
    >
      <SelectTrigger className="w-24" aria-label="表示件数" aria-controls={listboxId}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent id={listboxId}>
        {sizes.map((value) => (
          <SelectItem key={value} value={String(value)}>
            {value}件
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
