import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export default function Skeleton({ className, variant = 'text', width, height }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        variant === 'circular' && 'rounded-full',
        variant === 'text' && 'rounded-md h-4',
        variant === 'rectangular' && 'rounded-lg',
        className,
      )}
      style={{ width, height }}
    />
  );
}

export function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3 p-6">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="flex-1 h-8" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm">
          <Skeleton variant="circular" className="w-12 h-12 mb-4" />
          <Skeleton className="w-24 h-8 mb-2" />
          <Skeleton className="w-32 h-4" />
        </div>
      ))}
    </div>
  );
}
