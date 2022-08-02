import clsx from 'clsx';
import * as React from 'react';
import { IconType } from 'react-icons/lib';

import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import OurLifeCard from '@/components/cards/OurLifeCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import {
  getLinks,
  getOurLives,
  getSettings,
  getTranslationsByNamespace,
} from '@/cms';
import { AppContext } from '@/context/AppContext';
import IconBook from '@/icons/Book';
import IconChildren from '@/icons/Children';
import IconHome from '@/icons/Home';
import IconPizza from '@/icons/Pizza';
import IconPublic from '@/icons/Public';
import IconUni from '@/icons/Uni';

import { Links, OurLife, Settings, Translations } from '@/types/types';
const icons = {
  Book: IconBook,
  Children: IconChildren,
  Home: IconHome,
  Pizza: IconPizza,
  Uni: IconUni,
  Public: IconPublic,
} as { [key: string]: IconType };

export default function OurLifePage({
  translations,
  links,
  ourLives,
  settings,
}: {
  translations: Translations;
  links: Links;
  ourLives: OurLife[];
  settings: Settings;
}) {
  const isLoaded = useLoaded();
  const ourLife = ourLives.find(({ header }) => header) || {
    title: '',
    description: '',
  };
  return (
    <AppContext.Provider value={{ translations, links, settings }}>
      <Layout>
        <Seo templateTitle={translations['common-our-life']} description='' />

        <main>
          <section className={clsx(isLoaded && 'fade-in-start')}>
            <div className='layout min-h-main py-20'>
              <h1
                className='text-3xl md:text-5xl'
                data-fade='0'
                aria-label='our-life-title'
              >
                <Accent>{translations['common-our-life']}</Accent>
              </h1>
              <p
                className='mt-2 text-gray-600 dark:text-gray-300'
                data-fade='1'
                aria-label='our-life-description'
              >
                {ourLife.description}
              </p>

              <ul
                className='mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
                data-fade='5'
              >
                {ourLives.map(
                  (ourLife, i) =>
                    !ourLife.header && (
                      <OurLifeCard
                        key={ourLife.title}
                        snippet={{
                          ...ourLife,
                          icon: icons[ourLife.icon || 'Home'],
                        }}
                        index={i}
                      />
                    )
                )}
              </ul>
            </div>
          </section>
        </main>
      </Layout>
    </AppContext.Provider>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      translations: await getTranslationsByNamespace(['common'], locale),
      links: await getLinks(locale),
      ourLives: await getOurLives(locale),
      settings: await getSettings(),
    },
  };
}
