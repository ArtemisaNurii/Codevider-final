// src/components/I18nProvider.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { dictionaries, Locale, SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/dictionaries';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Initialize with default locale to match server-side rendering exactly
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    // 1. Check local storage first for an explicit user preference
    const savedLocale = localStorage.getItem('user-locale') as Locale;
    
    if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
      setLocaleState(savedLocale);
      document.documentElement.lang = savedLocale;
    } else {
      // 2. Automatically negotiate based on the user's browser locales
      const browserLocales = navigator.languages || [navigator.language];
      const matchedLocale = browserLocales
        .map(lang => lang.split('-')[0] as Locale) // Convert 'en-US' -> 'en'
        .find(lang => SUPPORTED_LOCALES.includes(lang));

      if (matchedLocale) {
        setLocaleState(matchedLocale);
        document.documentElement.lang = matchedLocale;
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('user-locale', newLocale);
    document.documentElement.lang = newLocale;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={dictionaries[locale]}>
        {children}
      </NextIntlClientProvider>
    </I18nContext.Provider>
  );
}

// Custom hook to consume the context inside your language switcher
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within an I18nProvider');
  return context;
}