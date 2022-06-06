import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FiMail, FiMapPin, FiPhoneCall } from 'react-icons/fi';
import { Tooltip as TooltipTippy } from 'react-tippy';

import Accent from '@/components/Accent';

import { data } from '@/../data';
export default function Footer() {
  const { t } = useTranslation('common');
  return (
    <footer className='w-full pb-2'>
      <main className='layout flex flex-col items-center border-t border-gray-600 pt-6 dark:border-gray-300'>
        <p className='mt-2 font-medium text-gray-600 dark:text-gray-300'>
          {t('contact-us')}
        </p>
        <ContactUsLinks {...data.church} />

        <p className='mt-8 text-sm text-gray-600 dark:text-gray-300'>
          {new Date().getFullYear()} © {t('church-in-sydney')}
          {' • '}
          {t('all-rights-reserved')}
        </p>
      </main>
    </footer>
  );
}

type ContactUsProps = {
  email: string;
  address: string;
  phone: string;
};

function ContactUsLinks({ email, address, phone }: ContactUsProps) {
  const copyStatusText = 'Click to copy ';

  const [copyStatus, setCopyStatus] = React.useState(copyStatusText);

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
        <TooltipTippy
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
              setCopyStatus('Copied to clipboard 🥳 ');
              setTimeout(() => setCopyStatus(copyStatusText), 1500);
            }}
          >
            <button className='rounded-sm align-middle focus:outline-none focus-visible:ring focus-visible:ring-primary-300'>
              <contact.icon className='h-7 w-7 align-middle text-gray-600 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
            </button>
          </CopyToClipboard>
        </TooltipTippy>
      ))}
    </div>
  );
}
