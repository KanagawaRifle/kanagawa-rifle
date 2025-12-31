// packages/website/src/features/news/components/Skeleton.tsx

import { ArrowLeft, Calendar, Hash, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton as UISkeleton } from '@/components/ui/skeleton';
import ShareLinks from '@/features/news/components/ShareLinks';

export default function MySkeleton() {
  return (
    <article className="w-full">
      <header className="mb-8">
        <div className="mb-2 flex justify-end gap-2">
          <ShareLinks title="" url="" loading={true} />
          <Button variant="ghost" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            更新
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            <Calendar className="mr-1 h-3 w-3" />
            <UISkeleton className="h-4 w-16" />
          </Badge>
          {[...Array(2).keys()].map((_, index) => (
            <Badge key={index} variant="outline" className="border-primary text-primary">
              <Hash className="mr-1 h-3 w-3" />
              <UISkeleton className="h-4 w-8" />
            </Badge>
          ))}
        </div>
      </header>

      {/* 概要 */}
      <div className="mb-8 space-y-2 rounded-lg bg-muted p-6 italic leading-relaxed">
        <UISkeleton className="h-4 w-full" />
        <UISkeleton className="h-4 w-full" />
        <UISkeleton className="h-4 w-3/5" />
      </div>

      <Card>
        <CardContent className="prose prose-lg dark:prose-invert max-w-none p-6">
          <UISkeleton className="mb-6 h-8 w-3/4" />
          <div className="space-y-2">
            {[...Array(5).keys()].map((_, index) => (
              <UISkeleton key={index} className="h-4 w-full" />
            ))}
            <UISkeleton className="h-4 w-3/5" />
          </div>
        </CardContent>
      </Card>

      <footer>
        <div className="mt-6">
          <Button variant="ghost" asChild>
            <Link href="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              一覧に戻る
            </Link>
          </Button>
        </div>
      </footer>
    </article>
  );
}
