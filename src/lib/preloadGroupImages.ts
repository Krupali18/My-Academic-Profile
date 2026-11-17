/**
 * Utilities for preloading research group member images.
 * Preloads avatar assets in the background so that navigating to the
 * Research Group page displays all member photos with 0ms visual delay.
 */

export const GROUP_IMAGES: string[] = [
  '/assets/faculty-mentor-cropped.webp',
  '/assets/vatsal-patel.webp',
  '/assets/yash-shah.webp',
  '/assets/ashish.webp',
  '/assets/priya shah.webp',
  '/assets/mann alpahara.webp',
  '/assets/moksh shah.webp',
  '/assets/kishlay ojha.webp',
  '/assets/priya narein.webp',
  '/assets/rudrani joshi.webp',
  '/assets/vansh-sharma.webp',
  '/assets/pankit-brahmkhatri.webp',
  '/assets/dev-sanghvi.webp',
  '/assets/hit-vekariya.webp',
  '/assets/naimish-bhuva.webp',
  '/assets/vimi-patel.webp',
];

let groupImagesPreloaded = false;

/**
 * Preload group images in browser memory and HTTP cache.
 * Can be safely called multiple times (idempotent).
 */
export function preloadGroupImages(): void {
  if (typeof window === 'undefined' || groupImagesPreloaded) return;
  groupImagesPreloaded = true;

  // Prioritize first 4 top cards (PI + first students)
  const topImages = GROUP_IMAGES.slice(0, 4);
  const remainingImages = GROUP_IMAGES.slice(4);

  topImages.forEach((src) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  });

  // Stream in the remaining images without blocking main thread
  const loadRemaining = () => {
    remainingImages.forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
  };

  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
      .requestIdleCallback(loadRemaining, { timeout: 1500 });
  } else {
    setTimeout(loadRemaining, 300);
  }
}
