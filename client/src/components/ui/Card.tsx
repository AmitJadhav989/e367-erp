import type { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
  children: ReactNode;
}

export default function Card({ glass = true, hover = true, className, children, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'rounded-2xl p-6',
        glass
          ? 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl'
          : 'bg-white shadow-lg border border-gray-100',
        className,
      )}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
