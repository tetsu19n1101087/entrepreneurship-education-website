import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// app/tokens.css で定義した独自の段階を tailwind-merge に教える。
// 教えないと text-heading-lg を文字色と判定し、cn('text-heading-lg', 'text-primary') で片方が消える
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'heading-xl',
        'heading-lg',
        'heading-lg-wide',
        'heading-md',
        'body-md',
        'body-sm',
        'body-xs',
        'label-md',
        'label-sm',
        'button-sm',
        'button-lg',
        'meta-sm',
      ],
      spacing: [
        'space-4',
        'space-8',
        'space-16',
        'space-24',
        'space-32',
        'space-48',
        'space-64',
        'space-80',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
