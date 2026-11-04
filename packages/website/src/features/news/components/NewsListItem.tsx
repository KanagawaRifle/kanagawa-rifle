// packages/website/src/features/news/components/ListItem.tsx

import { Calendar, Hash, ImageIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { getNewsItemHref } from '@/features/news/paths';

import { formatNewsDate } from '../dates';
import type { NewsSummary } from '../types';

type Props = NewsSummary & { isLast: boolean; headingAs: 'h2' | 'h3' };

// Reuse element identities so repeated SVG trees can share an RSC payload entry.
const imageIcon = <ImageIcon className="h-5 w-5" />;
const calendarIcon = <Calendar className="mr-1 h-3 w-3" />;
const tagIcon = <Hash className="mr-1 h-3 w-3" />;

export function NewsListItem({ slug, title, published, tags, excerpt, isLast, headingAs: Heading }: Props) {
  return (
    <li className={isLast ? '' : 'border-border border-b'}>
      <Link
        href={getNewsItemHref(slug)}
        prefetch={false}
        className="hover:bg-muted flex items-start gap-4 p-4 transition-colors"
      >
        <span aria-hidden="true" className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
          {imageIcon}
        </span>
        <div className="flex-1 space-y-2">
          <Heading className="text-lg font-semibold">{title}</Heading>
          {excerpt && <p className="text-muted-foreground line-clamp-1 text-base">{excerpt}</p>}
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge variant="outline">
              {calendarIcon}
              <time dateTime={published.toISOString()}>{formatNewsDate(published)}</time>
            </Badge>
            {tags &&
              tags.length > 0 &&
              tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-primary text-primary">
                  {tagIcon}
                  {tag}
                </Badge>
              ))}
          </div>
        </div>
      </Link>
    </li>
  );
}
