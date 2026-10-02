/// <reference types="vite/client" />
/**
 * Dr. Krupali Donda Academic Site - Cloudinary Asset URL Utilities
 * Handles optimized delivery URL construction for public image assets.
 * Upload/delete functions removed — static site does not need them.
 */

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit' | 'thumb' | 'scale';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'png' | 'jpg';
}

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'krupali-donda';

/**
 * Builds an optimized Cloudinary delivery URL with quality, format, and dimension parameters.
 * Supports either a full Cloudinary URL or a raw publicId.
 */
export function getOptimizedImageUrl(
  srcOrPublicId: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!srcOrPublicId) return '';

  const {
    width,
    height,
    crop = 'limit',
    quality = 'auto',
    format = 'auto',
  } = options;

  const transforms: string[] = [`f_${format}`, `q_${quality}`];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${crop}`);

  const transformString = transforms.join(',');

  // If already a full Cloudinary URL
  if (srcOrPublicId.includes('res.cloudinary.com')) {
    return srcOrPublicId.replace('/upload/', `/upload/${transformString}/`);
  }

  // If local asset or data URI (not a raw Cloudinary publicId)
  if (
    srcOrPublicId.startsWith('/') ||
    srcOrPublicId.startsWith('data:') ||
    srcOrPublicId.startsWith('blob:') ||
    srcOrPublicId.startsWith('http')
  ) {
    return srcOrPublicId;
  }

  // Raw publicId: build full Cloudinary URL
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${srcOrPublicId}`;
}

/**
 * Standard getOptimizedUrl alias
 */
export const getOptimizedUrl = getOptimizedImageUrl;

/**
 * Generates standard thumbnail URL (400x300 or 400x400)
 */
export function getThumbnailUrl(
  srcOrPublicId: string,
  width: number = 400,
  height: number = 300
): string {
  return getOptimizedImageUrl(srcOrPublicId, {
    width,
    height,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Generates 1200px max-width display image URL
 */
export function getDisplayUrl(srcOrPublicId: string): string {
  return getOptimizedImageUrl(srcOrPublicId, {
    width: 1200,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
  });
}
