import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { AppContext } from '@/context/AppContext';

export default function LocaleButton() {
  const { translations: t } = useContext(AppContext);
  const { locale, push, pathname, locales, defaultLocale } = useRouter();

  const nextLang = locales?.find((l) => l !== locale) || defaultLocale || 'en';

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
      onClick={() => {
        push(pathname, pathname, { locale: nextLang });
      }}
    >
      {label}
    </button>
  );
}
