import { cva } from 'class-variance-authority';

export const buttonVariants = cva('button-base', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-primary text-primary bg-background hover:bg-primary/10',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-muted hover:text-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded px-3',
      lg: 'h-11 rounded px-8',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'default',
  },
});
