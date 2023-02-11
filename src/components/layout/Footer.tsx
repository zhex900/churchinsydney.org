import { useContext } from 'react';

import ContactUsLinks from '@/components/links/ContactUsLinks';
import FooterLinks from '@/components/links/FooterLinks';

import { AppContext } from '@/context/AppContext';

export default function Footer() {
  const { translations: t, settings } = useContext(AppContext);
  return (
    <footer className='w-full pb-2'>
      <main className='layout flex flex-col items-center border-t border-gray-600 pt-6 dark:border-gray-300'>
        <FooterLinks />
        <p className='mt-12 font-medium text-gray-600 dark:text-gray-300'>
          {t['common-contact-us']}
        </p>
        <ContactUsLinks
          email={settings.email}
          address={settings.address}
          phone={settings.phone}
          translations={t}
        />

        <p
          suppressHydrationWarning
          className='mt-8 text-sm text-gray-600 dark:text-gray-300'
        >
          {new Date().getFullYear()} © {t['common-church-in-sydney']}
          {' • '}
          {t['common-all-rights-reserved']}
        </p>
      </main>
    </footer>
  );
}
