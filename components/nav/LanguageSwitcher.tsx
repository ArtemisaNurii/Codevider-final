'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useI18n } from '../providers/I18nProvider';
import { SUPPORTED_LOCALES, Locale } from '@/dictionaries';

const flags: Record<Locale, string> = {
  en: '🇺🇸',
  fr: '🇫🇷',
  es: '🇪🇸',
  sq: '🇦🇱',
  de: '🇩🇪',
  it: '🇮🇹',
};

type LanguageSwitcherProps = {
  variant?: 'light' | 'dark';
  fullWidth?: boolean;
  menuPlacement?: 'top' | 'bottom';
  onSelect?: () => void;
  className?: string;
};

const triggerStyles = {
  dark: 'rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white',
  light:
    'rounded-full border border-[var(--border)] bg-[var(--social-bg)] text-[var(--text)] hover:bg-[var(--accent-bg)] hover:text-[var(--text-h)]',
};

const menuStyles = {
  dark: 'rounded-xl border border-white/10 bg-slate-900/95 shadow-[0_12px_40px_rgba(0,0,0,0.28),0_4px_12px_rgba(0,0,0,0.16)] backdrop-blur-xl',
  light:
    'rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-[var(--shadow)] backdrop-blur-xl',
};

const optionStyles = {
  dark: {
    base: 'text-slate-300 hover:bg-white/8 hover:text-white',
    selected: 'bg-[#3a53c9]/25 text-white',
  },
  light: {
    base: 'text-[var(--text)] hover:bg-[var(--accent-bg)] hover:text-[var(--text-h)]',
    selected: 'bg-[var(--accent-bg)] text-[var(--text-h)]',
  },
};

export function LanguageSwitcher({
  variant = 'light',
  fullWidth = false,
  menuPlacement = 'bottom',
  onSelect,
  className = '',
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();
  const t = useTranslations('navbar');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const handleSelect = (lang: Locale) => {
    setLocale(lang);
    setOpen(false);
    onSelect?.();
  };

  const menuPositionClass =
    menuPlacement === 'top'
      ? 'bottom-full right-0 mb-2'
      : 'right-0 top-full mt-2';

  return (
    <div
      ref={containerRef}
      className={`relative ${fullWidth ? 'min-w-0 flex-1' : ''} ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('select_language')}
        className={`flex items-center justify-center text-sm font-medium transition-[background-color,color,border-color] active:scale-[0.96] ${triggerStyles[variant]} ${
          fullWidth ? 'w-full px-3 py-2.5' : 'size-9 p-0'
        }`}
      >
        <span className="text-lg leading-none">{flags[locale]}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('language_options')}
          className={`absolute z-50 min-w-36 overflow-hidden py-1 ${menuPositionClass} ${menuStyles[variant]}`}
        >
          {SUPPORTED_LOCALES.map((lang) => (
            <li key={lang} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={locale === lang}
                aria-label={lang.toUpperCase()}
                onClick={() => handleSelect(lang)}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-[background-color,color] active:scale-[0.96] ${
                  locale === lang
                    ? optionStyles[variant].selected
                    : optionStyles[variant].base
                }`}
              >
                <span className="text-base leading-none">{flags[lang]}</span>
                <span className="font-medium uppercase tracking-wide">
                  {lang}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
