import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PathItem } from '@/config/paths';

/** Contextual links remain available in the initial HTML and without JavaScript. */
export function PageLinks({ pages }: { pages: readonly PathItem[] }) {
  return (
    <nav aria-label="関連するご案内">
      <Card>
        <CardHeader>
          <CardTitle>関連するご案内</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3">
            {pages.map((page) => (
              <li key={page.getHref()}>
                <Link href={page.getHref()} className="text-primary underline">
                  {page.title ?? page.name}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </nav>
  );
}
