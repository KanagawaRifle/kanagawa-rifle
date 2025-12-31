// packages/website/src/components/SocialLinks.tsx

'use client';

import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { social } from '@/config';
import { cn } from '@/lib/utils';

export function SocialLinks() {
  return (
    <TooltipProvider>
      {Object.entries(social).map(([key, obj]) => (
        <Tooltip key={key}>
          <TooltipTrigger asChild>
            <a
              href={obj.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={obj.name}
              className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'hover:bg-background hover:text-primary')}
            >
              {obj.icon}
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>{obj.name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </TooltipProvider>
  );
}
