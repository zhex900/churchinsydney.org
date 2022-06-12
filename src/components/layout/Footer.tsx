import { useContext, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FiMail, FiMapPin, FiPhoneCall } from 'react-icons/fi';

import Accent from '@/components/Accent';
import FooterLinks from '@/components/links/FooterLinks';
import BaseTooltip from '@/components/tooltip/BaseTooltip';

import { data } from '@/../data';
import { AppContext } from '@/context/AppContext';

import { Translations } from '@/types/types';

export default function Footer() {
  const { translations: t } = useContext(AppContext);
  return (
    <footer className='w-full pb-2'>
      <main className='layout flex flex-col items-center border-t border-gray-600 pt-6 dark:border-gray-300'>
        <FooterLinks />
        <p className='mt-12 font-medium text-gray-600 dark:text-gray-300'>
          {t['common-contact-us'].text}
        </p>
        <ContactUsLinks {...data.church} t={t} />

        <p className='mt-8 text-sm text-gray-600 dark:text-gray-300'>
          {new Date().getFullYear()} © {t['common-church-in-sydney'].text}
          {' • '}
          {t['common-all-rights-reserved'].text}
        </p>
      </main>
    </footer>
  );
}

type ContactUsProps = {
  email: string;
  address: string;
  phone: string;
  t: Translations;
};

function ContactUsLinks({ email, address, phone, t }: ContactUsProps) {
  const [copyStatus, setCopyStatus] = useState(
    `${t['common-click-to-copy'].text} `
  );

  const contactUs = [
    {
      value: phone,
      icon: FiPhoneCall,
      id: 'phone',
    },
    {
      value: email,
      icon: FiMail,
      id: 'email',
    },

    {
      value: address,
      icon: FiMapPin,
      id: 'address',
    },
  ];

  return (
    <div className='mt-8 flex items-center justify-center space-x-4 pt-2'>
      {contactUs.map((contact) => (
        <BaseTooltip
          key={contact.id}
          trigger='mouseenter'
          hideOnClick={false}
          interactive
          html={
            <div className='inline-block rounded-md border bg-white p-2 text-gray-600 shadow-md dark:border-gray-600 dark:bg-dark dark:text-gray-200'>
              {copyStatus}
              <Accent className='inline-block font-medium'>
                {contact.value}
              </Accent>
            </div>
          }
        >
          <CopyToClipboard
            text={contact.value as string}
            onCopy={() => {
              setCopyStatus(t['common-copied-to-clipboard'].text);
              setTimeout(
                () => setCopyStatus(t['common-click-to-copy'].text),
                1500
              );
            }}
          >
            <button className='rounded-sm align-middle focus:outline-none focus-visible:ring focus-visible:ring-primary-300'>
              <contact.icon className='h-7 w-7 align-middle text-gray-600 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
            </button>
          </CopyToClipboard>
        </BaseTooltip>
      ))}
    </div>
  );
}
