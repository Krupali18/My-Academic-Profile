import React from 'react';
import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
  /** 'pulse' is default, 'wave' is an alternative shimmer style */
  variant?: 'pulse' | 'wave';
}

/**
 * Skeleton Loader — content placeholder during async data loading.
 * MD File 11: Always show a loading state that matches the content shape.
 * Respects prefers-reduced-motion.
 */
export function Skeleton({ className, variant = 'pulse' }: SkeletonProps): React.ReactElement {
  return (
    <div
      className={cn(
        'rounded bg-gray-200',
        variant === 'pulse' ? 'animate-pulse' : 'skeleton-wave',
        className
      )}
      aria-hidden="true"
    />
  );
}

/** Pre-built skeleton card for admin page list rows */
export function SkeletonCard(): React.ReactElement {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>
    </div>
  );
}

/** Pre-built skeleton for a dashboard stat card */
export function SkeletonStatCard(): React.ReactElement {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="w-10 h-10 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

/** Full-page skeleton for admin dashboard */
export function DashboardSkeleton(): React.ReactElement {
  return (
    <div className="space-y-8" aria-label="Loading dashboard..." aria-busy="true">
      {/* Stat cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonStatCard key={i} />
        ))}
      </div>
      {/* Table rows */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-48" />
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
