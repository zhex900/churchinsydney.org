import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

import { getTranslationsByNamespace } from '@/cms';

import { Translations } from '@/types/types';

export default function NotFoundPage({
  translations,
}: {
  translations: Translations;
}) {
  return (
    <>
      <Seo templateTitle={translations['page-not-found-page-not-found']} />

      <main>
        <section className='bg-dark'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-white'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-yellow-300'
            />
            <h1 className='mt-8'>
              {translations['page-not-found-page-not-found']}
            </h1>
            <CustomLink className='mt-4' href='/'>
              {translations['page-not-found-back-to-home']}
            </CustomLink>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      translations: await getTranslationsByNamespace(
        ['page-not-found'],
        locale
      ),
    },
  };
}
