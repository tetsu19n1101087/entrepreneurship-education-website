import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-space-8 rounded-full border border-transparent text-button-sm whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'border-primary bg-primary text-primary-foreground hover:bg-card hover:text-primary',
        destructive:
          'border-destructive bg-destructive text-destructive-foreground hover:bg-card hover:text-destructive focus-visible:ring-destructive/20',
        outline:
          'border-border bg-card hover:bg-accent hover:text-accent-foreground',
        secondary:
          'border-secondary bg-secondary text-secondary-foreground hover:bg-card hover:text-secondary',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'min-h-10 px-space-16 py-space-8 has-[>svg]:px-space-16',
        sm: 'min-h-10 px-space-16 py-space-8 has-[>svg]:px-space-16',
        lg: 'min-h-15 px-space-16 py-space-8 text-button-lg',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
