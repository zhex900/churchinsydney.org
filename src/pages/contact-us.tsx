import {
  getLinks,
  getSettings,
  getTranslationsByKeyStartsWith,
} from '@/lib/graphcms';

import Accent from '@/components/Accent';
import ContactUsCard from '@/components/cards/ContactUsCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { AppContext } from '@/context/AppContext';

import { Links, Settings, Translations } from '@/types/types';

export default function ContactUsPage({
  translations,
  links,
  settings,
}: {
  translations: Translations;
  links: Links;
  settings: Settings;
}) {
  return (
    <AppContext.Provider value={{ translations, settings, links }}>
      <Layout>
        <Seo
          templateTitle={translations['common-contact-us'].text}
          description={translations['common-contact-us'].text}
        />

        <main>
          <section className=''>
            <div className='layout flex flex-col items-center py-20 text-center'>
              <h1>
                <Accent>{translations['common-contact-us'].text}</Accent>
              </h1>
              <ContactUsCard
                className='mt-8 text-left'
                description={translations['contact-us-description'].text}
              />
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
  return {
    props: {
      translations: await getTranslationsByKeyStartsWith(
        ['common', 'contact'],
        [locale, defaultLocale]
      ),
      links: await getLinks([locale, defaultLocale]),
      settings: await getSettings(),
    },
  };
}
