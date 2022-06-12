import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import { getTranslationsByKeyStartsWith } from '@/lib/graphcms';

import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

import { Translations } from '@/types/types';

export default function NotFoundPage({
  translations,
}: {
  translations: Translations;
}) {
  return (
    <>
      <Seo templateTitle={translations['404-page-not-found'].text} />

      <main>
        <section className='bg-dark'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-white'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-yellow-300'
            />
            <h1 className='mt-8'>{translations['404-page-not-found'].text}</h1>
            <CustomLink className='mt-4' href='/'>
              {translations['404-page-back-to-home'].text}
            </CustomLink>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps({
  locale,
  defaultLocale,
}: {
  locale: string;
  defaultLocale: string;
}) {
  return {
    props: {
      translations: await getTranslationsByKeyStartsWith(['404-page'], [
        locale,
        defaultLocale,
      ]),
    },
  };
}
