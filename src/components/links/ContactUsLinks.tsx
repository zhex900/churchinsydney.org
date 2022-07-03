import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FiMail, FiMapPin, FiPhoneCall } from 'react-icons/fi';

import Accent from '@/components/Accent';
import BaseTooltip from '@/components/tooltip/BaseTooltip';

import { Translations } from '@/types/types';

type ContactUsProps = {
  email: string;
  address: string;
  phone: string;
  translations: Translations;
};

export default function ContactUsLinks({
  email,
  address,
  phone,
  translations: t,
}: ContactUsProps) {
  const [copyStatus, setCopyStatus] = useState(`${t['common-click-to-copy']} `);
  const [copiedToClipBoard, setCopiedToClipBoard] = useState(
    `${t['common-copied-to-clipboard']} `
  );
  useEffect(() => {
    setCopyStatus(t['common-click-to-copy']);
    setCopiedToClipBoard(t['common-copied-to-clipboard']);
  }, [t]);

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
    <div
      aria-label='contact us links'
      className='mt-8 flex items-center justify-center space-x-4 pt-2'
    >
      {contactUs.map((contact) => (
        <BaseTooltip
          key={contact.id}
          aria-label={`${contact.id} tooltip`}
          content={
            <div>
              {`${copyStatus} `}
              <Accent className='inline-block font-medium'>
                {contact.value}
              </Accent>
            </div>
          }
        >
          <CopyToClipboard
            text={contact.value as string}
            onCopy={() => {
              setCopyStatus(copiedToClipBoard);
              setTimeout(() => setCopyStatus(copyStatus), 1500);
            }}
          >
            <button
              aria-label={`${contact.id}`}
              className='rounded-sm align-middle focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
            >
              <contact.icon className='h-7 w-7 align-middle text-gray-600 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
            </button>
          </CopyToClipboard>
        </BaseTooltip>
      ))}
    </div>
  );
}
