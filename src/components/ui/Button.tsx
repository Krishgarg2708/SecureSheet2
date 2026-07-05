import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from '../../utils/clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-gold-500 text-ledger-950 hover:bg-gold-400 shadow-glow',
  secondary: 'bg-ledger-800 text-ledger-100 hover:bg-ledger-700',
  outline: 'border border-ledger-300 dark:border-ledger-700 text-ledger-800 dark:text-ledger-100 hover:bg-ledger-100 dark:hover:bg-ledger-800',
  ghost: 'text-ledger-600 dark:text-ledger-300 hover:bg-ledger-100 dark:hover:bg-ledger-800',
  danger: 'bg-red-500/90 text-white hover:bg-red-500',
};

const sizeClasses: Record<string, string> = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-base px-6 py-3 gap-2.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.015 }}
      className={clsx(
        'relative inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-ring disabled:opacity-50 disabled:pointer-events-none overflow-hidden',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...(props as any)}
    >
      {icon}
      {children}
    </motion.button>
  );
}
