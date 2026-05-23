import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from './services/locale';
import { Locale } from './config';

export default getRequestConfig(async () => {
  let locale: Locale = 'en';

  try {
    locale = await getUserLocale() as Locale;
  } catch (error) {
    console.error('Error getting user locale:', error);
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
