'use client';

import { FacebookIcon, InstagramIcon, TwitterIcon } from '@/components/icons/social';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { social, type SocialKey } from '@/config/social';
import { cn } from '@/lib/utils';

const icons = { facebook: FacebookIcon, twitter: TwitterIcon, instagram: InstagramIcon };

export function SocialLinks() {
  return (
    <TooltipProvider>
      {Object.entries(social).map(([key, obj]) => {
        const Icon = icons[key as SocialKey];
        return (
          <Tooltip key={key}>
            <TooltipTrigger asChild>
              <a
                href={obj.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={obj.name}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                  'hover:bg-background hover:text-primary',
                )}
              >
                <Icon className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{obj.name}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </TooltipProvider>
  );
}
