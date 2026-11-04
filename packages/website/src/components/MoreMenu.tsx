'use client';

import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { paths } from '@/config/paths';

// その他メニューコンポーネント
export default function MoreMenu() {
  return (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="その他のメニューを開く" title="各種書式・リンク集">
          <EllipsisVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(paths.sub).map(([key, obj]) => (
          <DropdownMenuItem key={key} asChild>
            <Link href={obj.getHref()}>{obj.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
