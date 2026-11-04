import { Button, ButtonGroup, buttonVariants } from '@/components/ui/button';

import type { Competition } from '../schema';

export function CompetitionActions({ actions, home = false }: { actions: Competition['actions']; home?: boolean }) {
  return (
    <ButtonGroup className="flex-wrap">
      {actions.map((action) => {
        const label = home ? (action.homeLabel ?? action.name) : action.name;
        const target = action.target ?? '_blank';
        const style = { variant: 'outline', size: home ? 'sm' : 'default' } as const;
        return action.disabled ? (
          <Button key={action.name} {...style} disabled aria-label={label}>
            {label}
          </Button>
        ) : (
          <a
            key={action.name}
            className={buttonVariants(style)}
            aria-label={label}
            href={action.href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          >
            {label}
          </a>
        );
      })}
    </ButtonGroup>
  );
}
