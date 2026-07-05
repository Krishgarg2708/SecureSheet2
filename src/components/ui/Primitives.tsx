import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from '../../utils/clsx';

export function Card({ children, className, hover = false }: { children: ReactNode; className?: string; hover?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={clsx('card p-5', className)}
    >
      {children}
    </motion.div>
  );
}

const badgeColors: Record<string, string> = {
  success: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
  error: 'bg-red-500/15 text-red-500 border-red-500/30',
  warning: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
  info: 'bg-sky-500/15 text-sky-500 border-sky-500/30',
  neutral: 'bg-ledger-300/15 text-ledger-500 border-ledger-400/30',
  gold: 'bg-gold-500/15 text-gold-500 border-gold-500/30',
};

export function Badge({ children, tone = 'neutral', className }: { children: ReactNode; tone?: keyof typeof badgeColors; className?: string }) {
  return (
    <span className={clsx('inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium', badgeColors[tone], className)}>
      {children}
    </span>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx('animate-pulse rounded-lg bg-ledger-200/70 dark:bg-ledger-800/70', className)} />;
}

export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ledger-100 text-ledger-500 dark:bg-ledger-800 dark:text-ledger-300">{icon}</div>}
      <h3 className="font-display text-lg font-semibold text-ledger-900 dark:text-ledger-50">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ledger-500 dark:text-ledger-400">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
