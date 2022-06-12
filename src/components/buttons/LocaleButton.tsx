import clsx from 'clsx';
import { useRouter } from 'next/router';
import setLanguage from 'next-translate/setLanguage';
import { useContext } from 'react';

import { defaultLocale, locales } from '@/../i18n';
import { TranslationContext } from '@/context/TranslationContext';

export default function LocaleButton() {
  const t = useContext(TranslationContext);
  const { locale } = useRouter();

  const nextLang = locales.find((l) => l !== locale) || defaultLocale;

  const label = t[`common-locale-${nextLang.toLocaleLowerCase()}`].text;
  return (
    <button
      className={clsx(
        'button',
        'rounded-md p-2.5 focus:outline-none',
        'border dark:border-gray-600',
        'hover:border-primary-300 hover:text-primary-300 dark:hover:border-primary-300 dark:hover:text-primary-300',
        'focus-visible:border-primary-300 focus-visible:text-primary-300 dark:focus-visible:border-primary-300 dark:focus-visible:text-primary-300'
      )}
      onClick={async () => await setLanguage(nextLang)}
    >
      {label}
    </button>
  );
}
