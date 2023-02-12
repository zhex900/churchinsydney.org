import Head from 'next/head';

import { SITE_TITLE } from '@/constants';
const defaultData = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  name: SITE_TITLE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '',
    addressLocality: '',
    addressRegion: '',
    postalCode: '',
    addressCountry: 'Australia',
  },
  url: process.env.SITE_URL,
  telephone: '',
  logo: `${process.env.SITE_URL}/images/logo.svg`,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '10:00',
      closes: '12:00',
    },
  ],
};

interface Props {
  address: string;
  phone: string;
}
/*
 *
 * This is used only in the index page.
 * It is possible to make this generic so it can be use for posts and events.
 * For now, it is not needed.
 *
 */
export default function StructuredData({ address, phone }: Props) {
  const [street, city, state, postcode] = address.split(',');
  defaultData.address.streetAddress = street;
  defaultData.address.addressLocality = city;
  defaultData.address.addressRegion = state;
  defaultData.address.postalCode = postcode;
  defaultData.telephone = phone;
  return (
    <Head>
      <script
        key='structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultData) }}
      />
    </Head>
  );
}
