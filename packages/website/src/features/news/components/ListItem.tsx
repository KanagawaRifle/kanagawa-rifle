// packages/website/src/features/news/components/ListItem.tsx

import { Calendar, Hash, ImageIcon } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton as UISkeleton } from '@/components/ui/skeleton';

type Props = {
  slug: string;
  title: string;
  published: Date | string;
  tags?: string[];
  excerpt?: string;
  isLast: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const dateFormatter = new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });

function formatPublishedDate(published: Date | string): { dateTime: string; display: string } {
  const date = typeof published === 'string' ? new Date(published) : published;
  return {
    dateTime: date.toISOString(),
    display: dateFormatter.format(date),
  };
}

export function Skeleton({ isLast }: { isLast: boolean }) {
  return (
    <li className={isLast ? '' : 'border-b border-border'}>
      <div className="flex items-start gap-4 p-4">
        <UISkeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <UISkeleton className="h-6 w-3/4" />
          <UISkeleton className="h-4 w-full" />
          <UISkeleton className="h-4 w-3/5" />
          <div className="flex gap-2 pt-1">
            <UISkeleton className="h-6 w-24" />
            <UISkeleton className="h-6 w-16" />
            <UISkeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
    </li>
  );
}

export function ListNewsItem({ slug, title, published, tags, excerpt, isLast, onMouseEnter }: Props) {
  const { dateTime, display } = formatPublishedDate(published);

  return (
    <li className={isLast ? '' : 'border-b border-border'}>
      <Link
        href={`/news/${slug}`}
        className="flex items-start gap-4 p-4 transition-colors hover:bg-muted"
        onMouseEnter={onMouseEnter}
      >
        <Avatar aria-hidden="true">
          <AvatarFallback>
            <ImageIcon className="h-5 w-5" aria-hidden="true" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {excerpt && <p className="line-clamp-1 text-base text-muted-foreground">{excerpt}</p>}
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge variant="outline">
              <Calendar className="mr-1 h-3 w-3" />
              <time dateTime={dateTime} suppressHydrationWarning>
                {display}
              </time>
            </Badge>
            {tags &&
              tags.length > 0 &&
              tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-primary text-primary">
                  <Hash className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
          </div>
        </div>
      </Link>
    </li>
  );
}
