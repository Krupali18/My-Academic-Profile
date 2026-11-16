import { useEffect } from 'react';

export function useImageProtection() {
  useEffect(() => {
    // Prevent right-click context menu on images and visual media
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.tagName === 'IMG' ||
        target.tagName === 'PICTURE' ||
        target.tagName === 'CANVAS' ||
        target.closest('img') ||
        target.closest('picture') ||
        target.closest('.hero-banner-image') ||
        target.closest('.showcase-slide') ||
        target.closest('.lightbox-stage') ||
        target.closest('.gallery-showcase-section') ||
        target.closest('.about-gallery-grid') ||
        target.closest('.gallery-hero-container')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Prevent dragging images to desktop or other windows
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.tagName === 'IMG' ||
        target.tagName === 'PICTURE' ||
        target.closest('img') ||
        target.closest('picture')
      ) {
        e.preventDefault();
      }
    };

    // Deter keyboard shortcuts for saving or viewing source
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S or Cmd+S (Save webpage)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
      }
      // Ctrl+U or Cmd+U (View page source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    document.addEventListener('dragstart', handleDragStart, { capture: true });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      document.removeEventListener('dragstart', handleDragStart, { capture: true });
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
