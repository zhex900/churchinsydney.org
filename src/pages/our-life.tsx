import clsx from 'clsx';
import * as React from 'react';
import { BsHouseDoor, BsMoonStars, BsPeople } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { GiVineLeaf } from 'react-icons/gi';
import { IconType } from 'react-icons/lib';
import { MdOutlineEmojiPeople } from 'react-icons/md';

import {
  getLinks,
  getOurLives,
  getSettings,
  getTranslationsByKeyStartsWith,
} from '@/lib/graphcms';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import OurLifeCard from '@/components/cards/OurLifeCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { AppContext } from '@/context/AppContext';

import { Links, ourLife, Settings, Translations } from '@/types/types';

const icons = {
  BsHouseDoor: BsHouseDoor,
  BsMoonStars: BsMoonStars,
  BsPeople: BsPeople,
  MdOutlineEmojiPeople: MdOutlineEmojiPeople,
  GiVineLeaf: GiVineLeaf,
  FaGraduationCap: FaGraduationCap,
} as { [key: string]: IconType };

export default function OurLifePage({
  translations,
  links,
  ourLives,
  settings,
}: {
  translations: Translations;
  links: Links;
  ourLives: ourLife[];
  settings: Settings;
}) {
  const isLoaded = useLoaded();

  const ourLife = ourLives.find(({ isHeader }) => isHeader) || {
    title: '',
    description: '',
  };
  return (
    <AppContext.Provider value={{ translations, links, settings }}>
      <Layout>
        <Seo
          templateTitle={translations['common-our-life'].text}
          description=''
        />

        <main>
          <section className={clsx(isLoaded && 'fade-in-start')}>
            <div className='layout min-h-main py-20'>
              <h1 className='text-3xl md:text-5xl' data-fade='0'>
                <Accent>{translations['common-our-life'].text}</Accent>
              </h1>
              <p
                className='mt-2 text-gray-600 dark:text-gray-300'
                data-fade='1'
              >
                {ourLife.description}
              </p>

              <ul
                className='mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
                data-fade='5'
              >
                {ourLives.map((snippet, i) => (
                  <OurLifeCard
                    key={snippet.title}
                    snippet={{
                      ...snippet,
                      icon: icons[snippet.icon || 'BsHouseDoor'],
                    }}
                    index={i}
                  />
                ))}
              </ul>
            </div>
          </section>
        </main>
      </Layout>
    </AppContext.Provider>
  );
}

export async function getStaticProps({
  locale,
  defaultLocale,
}: {
  locale: string;
  defaultLocale: string;
}) {
  const locales = [locale, defaultLocale];
  return {
    props: {
      translations: await getTranslationsByKeyStartsWith(['common'], locales),
      links: await getLinks(locales),
      ourLives: await getOurLives(locales),
      settings: await getSettings(),
    },
  };
}
