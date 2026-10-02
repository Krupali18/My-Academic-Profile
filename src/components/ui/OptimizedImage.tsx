import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  priority?: boolean;
}

/**
 * Image wrapper with lazy loading, decoding async, and graceful fallback handling.
 */
export function OptimizedImage({
  src,
  alt,
  className,
  fallbackSrc = '/assets/genratedd-2.png',
  priority = false,
  ...props
}: OptimizedImageProps): React.ReactElement {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = (): void => {
    if (!hasError && fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt ?? ''}  // M49 FIX: empty string is correct for decorative images; never 'Image'
      className={cn('transition-opacity duration-300', className)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={handleError}
      {...props}
    />
  );
}
