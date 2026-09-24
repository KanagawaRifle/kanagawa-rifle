import { Button, ButtonGroup } from '@/components/ui/button';

import type { Competition } from '../schema';

export function CompetitionActions({ actions, home = false }: { actions: Competition['actions']; home?: boolean }) {
  return (
    <ButtonGroup className="flex-wrap">
      {actions.map((action) => {
        const label = home ? (action.homeLabel ?? action.name) : action.name;
        const target = action.target ?? '_blank';
        return (
          <Button
            key={action.name}
            variant="outline"
            size={home ? 'sm' : 'default'}
            asChild={!action.disabled}
            disabled={action.disabled ?? false}
            aria-label={label}
          >
            {action.disabled ? (
              label
            ) : (
              <a href={action.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
                {label}
              </a>
            )}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
