import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { paths } from '@/config/paths';
import { cn } from '@/lib/utils';

import { recommendationFees } from '../data';

const categoryVariants = {
  ライフル: 'default',
  けん銃: 'secondary',
  低年者: 'info',
  その他: 'outline',
} as const;

export function RecommendationFees() {
  return (
    <Card className="defer-render [contain-intrinsic-block-size:auto_500px]">
      <CardHeader>
        <CardTitle>手数料</CardTitle>
        <CardDescription>推薦に係る手数料</CardDescription>
      </CardHeader>
      <CardContent>
        手数料は
        <Link href={paths.main.about.getHref()} className="text-primary hover:bg-primary/10 underline">
          当協会の指定口座
        </Link>
        までお振込みください。
      </CardContent>
      <ul>
        {recommendationFees.map((fee) => (
          <li key={fee.name} className="border-border flex items-center justify-between border-b p-4 last:border-b-0">
            <div className="flex items-center gap-2">
              <Badge variant={categoryVariants[fee.category]}>{fee.category}</Badge>
              <div>
                <span>{fee.name}</span>
                {'note' in fee && <div className="text-muted-foreground text-xs">{fee.note}</div>}
              </div>
            </div>
            <span className={cn('text-xl font-bold', fee.amount === 0 && 'text-green-700 dark:text-green-400')}>
              {fee.amount === 0 ? '無料' : `${fee.amount.toLocaleString('ja-JP')}円`}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
