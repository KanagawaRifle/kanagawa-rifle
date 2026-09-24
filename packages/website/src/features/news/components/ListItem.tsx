// packages/website/src/features/news/components/ListItem.tsx

import { Calendar, Hash, ImageIcon } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type Props = {
  slug: string;
  title: string;
  published: Date | string;
  tags?: string[];
  excerpt?: string;
  isLast: boolean;
};

const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Asia/Tokyo',
});

function formatPublishedDate(published: Date | string): { dateTime: string; display: string } {
  const date = typeof published === 'string' ? new Date(published) : published;
  return {
    dateTime: date.toISOString(),
    display: dateFormatter.format(date),
  };
}

export function ListNewsItem({ slug, title, published, tags, excerpt, isLast }: Props) {
  const { dateTime, display } = formatPublishedDate(published);

  return (
    <li className={isLast ? '' : 'border-border border-b'}>
      <Link href={`/news/${slug}`} className="hover:bg-muted flex items-start gap-4 p-4 transition-colors">
        <Avatar aria-hidden="true">
          <AvatarFallback>
            <ImageIcon className="h-5 w-5" aria-hidden="true" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {excerpt && <p className="text-muted-foreground line-clamp-1 text-base">{excerpt}</p>}
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge variant="outline">
              <Calendar className="mr-1 h-3 w-3" />
              <time dateTime={dateTime}>{display}</time>
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
