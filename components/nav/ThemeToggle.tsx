'use client';

import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useTheme } from '../providers/ThemeProvider';

type ThemeToggleProps = {
  variant?: 'light' | 'dark';
  fullWidth?: boolean;
  className?: string;
};

export function ThemeToggle({
  variant = 'light',
  fullWidth = false,
  className = '',
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('navbar');
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('switch_to_light_mode') : t('switch_to_dark_mode')}
      className={`relative flex items-center justify-center rounded-full border transition-[background-color,color,border-color] active:scale-[0.96] ${
        fullWidth ? 'min-w-0 flex-1 py-2.5' : 'size-9'
      } ${
        variant === 'dark'
          ? 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
          : 'border-[var(--border)] bg-[var(--social-bg)] text-[var(--text)] hover:bg-[var(--accent-bg)] hover:text-[var(--text-h)]'
      } ${className}`}
    >
      <motion.span
        key={isDark ? 'sun' : 'moon'}
        initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="size-4" aria-hidden />
        ) : (
          <Moon className="size-4" aria-hidden />
        )}
      </motion.span>
    </button>
  );
}
