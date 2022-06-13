import clsx from 'clsx';
import * as React from 'react';

import {
  getLinks,
  getOurBeliefs,
  getSettings,
  getTranslationsByKeyStartsWith,
} from '@/lib/graphcms';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { AppContext } from '@/context/AppContext';

import { Links, ourBelief, Settings, Translations } from '@/types/types';

export default function OurBeliefsPage({
  translations,
  links,
  ourBeliefs,
  settings,
}: {
  translations: Translations;
  links: Links;
  ourBeliefs: ourBelief[];
  settings: Settings;
}) {
  const isLoaded = useLoaded();
  const header = ourBeliefs.find(({ isHeader }) => isHeader) || {
    text: '',
    ref: '',
  };
  return (
    <AppContext.Provider value={{ translations, links, settings }}>
      <Layout>
        <Seo templateTitle='Our Beliefs' description='' />

        <main>
          <section className={clsx(isLoaded && 'fade-in-start')}>
            <div className='layout min-h-main py-20'>
              <h2 data-fade='0'>{translations['common-our-beliefs'].text}</h2>
              <h1 className='mt-1' data-fade='1'>
                <Accent>{header.text}</Accent>
              </h1>
              <p className='mt-1 italic' data-fade='1'>
                <Accent>{header.ref}</Accent>
              </p>
              <div className='mt-4' data-fade='2'>
                <article className=''>
                  <ul className='list-disc'>
                    {ourBeliefs.map(({ text, ref }, i) => (
                      <li className='mt-5' key={ref}>
                        <p data-fade={i} className=''>
                          {text} <br />
                          <span className='italic'>{ref}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
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
      ourBeliefs: await getOurBeliefs(locales),
      settings: await getSettings(),
    },
  };
}
