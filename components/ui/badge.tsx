import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-space-4 overflow-hidden rounded-md border px-space-8 py-space-4 text-label-sm whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-auto [&>svg]:size-3',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-primary-subtle text-on-primary-subtle',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground focus-visible:ring-destructive/20 [a&]:hover:bg-destructive/90',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot='badge'
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
