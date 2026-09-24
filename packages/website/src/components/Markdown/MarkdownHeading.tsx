import { Link as LinkIcon } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

const headingStyles = {
  1: 'border-border mt-8 mb-6 border-b-2 pb-3 text-3xl font-bold first:mt-0',
  2: 'border-border mt-8 mb-4 border-b pb-2 text-2xl font-bold',
  3: 'mt-6 mb-3 text-xl font-bold',
  4: 'mt-5 mb-3 text-lg font-semibold',
  5: 'mt-4 mb-2 text-base font-semibold',
  6: 'mt-4 mb-2 text-sm font-semibold',
} as const;

type Props = ComponentPropsWithoutRef<'h1'> & { level: keyof typeof headingStyles };

export function MarkdownHeading({ level, id, className, children, ...props }: Props) {
  const Heading = `h${level}` as const;
  return (
    <Heading id={id} className={cn('group text-foreground relative', headingStyles[level], className)} {...props}>
      {id && (
        <a
          href={`#${id}`}
          className="absolute top-0 -left-7 hidden translate-y-1/2 no-underline opacity-0 transition-opacity group-hover:opacity-50 hover:!opacity-100 focus-visible:opacity-100 md:block"
          aria-label="Link to this heading"
        >
          <LinkIcon className="h-5 w-5" />
        </a>
      )}
      {children}
    </Heading>
  );
}
