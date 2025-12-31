// packages/website/src/components/ui/stepper.tsx

import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface StepperProps {
  orientation?: 'horizontal' | 'vertical';
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

function Stepper({ orientation = 'vertical', children, className, 'aria-label': ariaLabel }: StepperProps) {
  return (
    <ol
      aria-label={ariaLabel ?? '手順'}
      className={cn('flex list-none p-0 m-0', orientation === 'vertical' ? 'flex-col' : 'flex-row', className)}
    >
      {children}
    </ol>
  );
}

interface StepProps {
  expanded?: boolean;
  active?: boolean;
  completed?: boolean;
  children: React.ReactNode;
  className?: string;
  'aria-current'?: 'step' | undefined;
}

function Step({ children, className, 'aria-current': ariaCurrent }: StepProps) {
  return (
    <li className={cn('relative', className)} aria-current={ariaCurrent}>
      {children}
    </li>
  );
}

interface StepLabelProps {
  icon?: React.ReactNode;
  completed?: boolean;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

function StepLabel({ icon, completed, active, children, className }: StepLabelProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        aria-hidden="true"
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors',
          completed && 'border-primary bg-primary text-primary-foreground',
          active && !completed && 'border-primary text-primary',
          !completed && !active && 'border-muted-foreground text-muted-foreground'
        )}
      >
        {completed ? <Check className="h-4 w-4" /> : icon}
      </div>
      <span
        className={cn(
          'font-medium',
          completed && 'text-foreground',
          active && !completed && 'text-foreground',
          !completed && !active && 'text-muted-foreground'
        )}
      >
        {children}
      </span>
    </div>
  );
}

interface StepContentProps {
  children: React.ReactNode;
  className?: string;
}

function StepContent({ children, className }: StepContentProps) {
  return <div className={cn('ml-4 border-l-2 border-border pl-8 pb-6 pt-2', className)}>{children}</div>;
}

export { Stepper, Step, StepLabel, StepContent };
