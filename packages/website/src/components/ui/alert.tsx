// packages/website/src/components/ui/alert.tsx

import { cva, type VariantProps } from 'class-variance-authority';
import { Info, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded border px-4 py-3 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3',
  {
    variants: {
      variant: {
        default: 'border-border bg-transparent text-foreground [&>svg]:text-foreground',
        destructive: 'border-destructive bg-transparent text-destructive-foreground [&>svg]:text-destructive',
        success: 'border-success bg-transparent text-success-foreground [&>svg]:text-success',
        warning: 'border-warning bg-transparent text-warning-foreground [&>svg]:text-warning',
        info: 'border-info bg-transparent text-info-foreground [&>svg]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const variantIcons = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant = 'default', children, ...props }, ref) => {
  const Icon = variantIcons[variant ?? 'default'];
  return (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      <Icon className="h-5 w-5" aria-hidden="true" />
      {children}
    </div>
  );
});
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-3 text-lg font-medium leading-none tracking-tight', className)} {...props} />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('text-base [&_p]:leading-relaxed', className)} {...props} />
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
