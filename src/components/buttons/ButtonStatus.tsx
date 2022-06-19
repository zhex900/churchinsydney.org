import { useContext, useEffect } from 'react';

import { AppContext } from '@/context/AppContext';

import { setStatusType, statusType } from '@/types/types';

export default function ButtonStatus({
  status,
  setStatus,
}: {
  status: statusType;
  setStatus: setStatusType;
}) {
  const { translations: t } = useContext(AppContext);

  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => setStatus('idle'), 3000);
    }
  }, [setStatus, status]);

  if (status === 'success') {
    return (
      <>
        <div className='inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg  text-green-500  dark:text-green-200'>
          <svg
            className='h-5 w-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        {t['contact-us-success-message']}
      </>
    );
  }
  if (status === 'error') {
    return (
      <>
        <div className='inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg  text-red-500  dark:text-red-200'>
          <svg
            className='h-5 w-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        {t['contact-us-error-message']}
      </>
    );
  }

  return <span>{t['common-submit']}</span>;
}
