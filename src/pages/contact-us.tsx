import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

import Accent from '@/components/Accent';
import ContactUsCard from '@/components/content/blog/ContactUsCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function ContactUsPage() {
  const { t } = useTranslation('common');
  return (
    <Layout>
      <Seo
        templateTitle='Subscribe'
        description='Get notified every time there is a new post through your email.'
      />

      <main>
        <section className=''>
          <div className='layout flex flex-col items-center py-20 text-center'>
            <h1>
              <Accent>{t('contact-us')}</Accent>
            </h1>
            <ContactUsCard
              className='mt-8 text-left'
              description='We are Christians who desire to enjoy our Lord exceedingly, and wish that as many people as possible enter into the same enjoyment. We would be most happy and privileged to meet with you and have further fellowship concerning this Christ Jesus whom we love. We meet in at various districts in the inner and outer Sydney regions, and you would find it convenient to meet in a district meeting closest to you. Generally such meetings occur at various times where believers sing, pray, study the Bible and have sweet fellowship. Should you wish to meet with us, please contact us by leaving us a message and your details on the right, so that we may give you the relevant information to attend any of our meetings in Sydney with reference to the time and location of our meetings.'
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
