import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';

export interface YouTubeEmbedProps {
  url: string;
  title: string;
  className?: string;
}

/**
 * YouTube Embed with Facade Pattern (MD 05 Rule 7)
 * Renders thumbnail and play button first; loads iframe strictly on click to optimize page performance.
 */
export function YouTubeEmbed({ url, title, className }: YouTubeEmbedProps): React.ReactElement {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Extract 11-character video ID from YouTube URL
  const match = url.match(/(?:v=|\/embed\/|\.be\/)([A-Za-z0-9_-]{11})/);
  const videoId = match ? match[1] : '';

  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : '/assets/genratedd-2.png';

  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
    : url;

  if (isLoaded) {
    return (
      <div className={cn('relative aspect-video w-full overflow-hidden bg-black', className)}>
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsLoaded(true)}
      className={cn(
        'relative aspect-video w-full overflow-hidden bg-gray-900 cursor-pointer group shadow-md',
        className
      )}
      role="button"
      tabIndex={0}
      aria-label={`Play video: ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setIsLoaded(true);
      }}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        loading="lazy"
      />
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
          <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
