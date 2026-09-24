// packages/website/src/app/not-found.tsx

import { Frown, House } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { PageLayout } from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const title = '404 Not Found';
const description = '指定されたページが見つかりませんでした。';

export const metadata: Metadata = {
  title,
  description,
};

export default function Page() {
  return (
    <PageLayout>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <div className="text-muted-foreground flex items-center justify-center gap-4">
            <Frown className="h-16 w-16" />
            <span className="text-7xl font-black">404</span>
          </div>
          <div className="text-center">{description}</div>
          <Button asChild>
            <Link href="/">
              <House className="mr-2 h-4 w-4" />
              ホームへ
            </Link>
          </Button>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
