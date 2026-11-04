// packages/website/src/components/ui/button.tsx

import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { buttonVariants } from './button-styles';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, startIcon, endIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    // asChild が true の場合、Slot は単一の子要素を期待するため、
    // loading/startIcon/endIcon は渡さない
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={disabled || loading}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="size-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && startIcon}
        {children}
        {endIcon}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

// ButtonGroup コンポーネント
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    className={cn(
      'inline-flex [&>*]:rounded-none [&>*:first-child]:rounded-l [&>*:last-child]:rounded-r [&>*:not(:first-child)]:-ml-px',
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
ButtonGroup.displayName = 'ButtonGroup';

export { Button, ButtonGroup, buttonVariants };
