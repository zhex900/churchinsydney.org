/* eslint-disable react/jsx-key */
import clsx from 'clsx';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import { IoArrowDownOutline } from 'react-icons/io5';

import { generateRss } from '@/lib/rss';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import TC from '@/components/TC';

export default function IndexPage() {
  const isLoaded = useLoaded();
  const { t } = useTranslation('common');
  return (
    <Layout>
      <Seo />

      <main>
        <section
          className={clsx(
            'min-h-main -mt-20 mb-20 flex flex-col justify-center',
            isLoaded && 'fade-in-start'
          )}
        >
          <article className='layout'>
            <h1
              className='mt-1 text-3xl md:text-5xl 2xl:text-6xl'
              data-fade='2'
            >
              <Trans
                i18nKey='common:hero-banner'
                components={[
                  <Accent />,
                  <Accent />,
                  <br />,
                  <span className='mt-1 max-w-4xl leading-relaxed text-gray-700 dark:text-gray-200 md:mt-1 md:text-lg 2xl:text-xl' />,
                ]}
              />
            </h1>
            <div
              data-fade='5'
              className='mt-8 flex flex-wrap gap-4 md:!text-lg'
            >
              <div className='group relative'>
                <div
                  className={clsx(
                    'absolute -inset-0.5 animate-tilt rounded blur',
                    'bg-gradient-to-r from-primary-300 to-primary-400',
                    'dark:from-primary-200 dark:via-primary-300',
                    'opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
                  )}
                />
                <ButtonLink href='#intro'>{t('members-login')}</ButtonLink>
              </div>
            </div>
          </article>
          <UnstyledLink
            href='#intro'
            className={clsx(
              'absolute bottom-2 left-1/2 -translate-x-1/2 md:bottom-10',
              'cursor-pointer rounded-md transition-colors',
              'hover:text-primary-300 focus-visible:text-primary-300'
            )}
          >
            <IoArrowDownOutline className='h-8 w-8 animate-bounce md:h-10 md:w-10' />
          </UnstyledLink>
          <TC
            className={clsx(
              'absolute bottom-0 right-6',
              'translate-y-[37%] transform-gpu',
              'w-[calc(100%-3rem)] md:w-[600px] 2xl:w-[900px]',
              'z-[-1] opacity-70 dark:opacity-30'
            )}
          />
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  generateRss();

  return {
    props: {},
  };
}
