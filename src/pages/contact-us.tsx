import { getTranslationsByKeyStartsWith } from '@/lib/graphcms';

import Accent from '@/components/Accent';
import ContactUsCard from '@/components/cards/ContactUsCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { TranslationContext } from '@/context/TranslationContext';

import { Translations } from '@/types/types';

export default function ContactUsPage({
  translations,
}: {
  translations: Translations;
}) {
  return (
    <TranslationContext.Provider value={translations}>
      <Layout>
        <Seo
          templateTitle='Subscribe'
          description='Get notified every time there is a new post through your email.'
        />

        <main>
          <section className=''>
            <div className='layout flex flex-col items-center py-20 text-center'>
              <h1>
                <Accent>{translations['common-contact-us'].text}</Accent>
              </h1>
              <ContactUsCard
                className='mt-8 text-left'
                description='We are Christians who desire to enjoy our Lord exceedingly, and wish that as many people as possible enter into the same enjoyment. We would be most happy and privileged to meet with you and have further fellowship concerning this Christ Jesus whom we love. We meet in at various districts in the inner and outer Sydney regions, and you would find it convenient to meet in a district meeting closest to you. Generally such meetings occur at various times where believers sing, pray, study the Bible and have sweet fellowship. Should you wish to meet with us, please contact us by leaving us a message and your details on the right, so that we may give you the relevant information to attend any of our meetings in Sydney with reference to the time and location of our meetings.'
              />
            </div>
          </section>
        </main>
      </Layout>
    </TranslationContext.Provider>
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
        ['common'],
        [locale, defaultLocale]
      ),
    },
  };
}
