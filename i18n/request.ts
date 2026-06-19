import { getRequestConfig } from 'next-intl/server';
import { DEFAULT_LOCALE } from '@/dictionaries';

export default getRequestConfig(async () => {
  const locale = DEFAULT_LOCALE;
  const messages = (await import(`@/dictionaries/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
