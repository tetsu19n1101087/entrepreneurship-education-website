'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { isAllowedAvatarUrl } from '@/lib/avatar';
import { cn } from '@/lib/utils';
import { getImageProps } from 'next/image';

interface UserAvatarProps {
  name?: string | null;
  src?: string | null;
  /** 表示サイズ (px)。h-6=24 / h-8=32 / h-10=40 / h-12=48 */
  size: 24 | 32 | 40 | 48;
  className?: string;
  fallbackClassName?: string;
}

const SIZE_CLASS_NAMES = {
  24: 'h-6 w-6',
  32: 'h-8 w-8',
  40: 'h-10 w-10',
  48: 'h-12 w-12',
} as const;

export function UserAvatar({
  name,
  src,
  size,
  className,
  fallbackClassName,
}: UserAvatarProps) {
  // 許可外のホストは next/image に渡さず、頭文字表示にする
  const imageProps = isAllowedAvatarUrl(src)
    ? getImageProps({ src, alt: '', width: size, height: size }).props
    : null;

  return (
    <Avatar className={cn(SIZE_CLASS_NAMES[size], className)}>
      {imageProps && <AvatarImage {...imageProps} />}
      <AvatarFallback className={fallbackClassName}>
        {name?.charAt(0) || 'U'}
      </AvatarFallback>
    </Avatar>
  );
}
