import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  const { t } = useTranslation('common');
  return (
    <>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-dark'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-white'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-yellow-300'
            />
            <h1 className='mt-8'>{t('page-not-found')}</h1>
            <CustomLink className='mt-4' href='/'>
              {t('back-to-home')}
            </CustomLink>
          </div>
        </section>
      </main>
    </>
  );
}
