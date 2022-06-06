import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import Accent from '@/components/Accent';
import Button from '@/components/buttons/Button';
import CustomLink from '@/components/links/CustomLink';

type ContactUsCardProps = {
  className?: string;
  title?: string;
  description: string;
};
export default function ContactUsCard({
  className,
  title,
  description,
}: ContactUsCardProps) {
  const { register, handleSubmit, reset } = useForm<{ email: string }>();
  const [status, setStatus] = React.useState('idle');
  const [errMsg, setErrMsg] = React.useState(
    'Sorry, something went wrong please try again later'
  );

  const onSubmit = async (data: { email: string }) => {
    setStatus('loading');

    axios
      .post<{ message: string }>('/api/newsletter/add', {
        email: data.email,
      })
      .then(() => {
        reset();
        // if (subscriber?.count) mutate({ count: subscriber.count + 1 });
        setStatus('success');
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.message?.includes('subscribed')) {
            setStatus('subscribed');
          } else {
            setStatus('error');
            setErrMsg(
              error.response?.data.message ?? 'Something is wrong with the API.'
            );
          }
        } else {
          setStatus('error');
          setErrMsg('Something is wrong with the API.');
        }
      });
  };
  //#endregion  //*======== Form and Status ===========

  return (
    <div
      className={clsx('rounded border p-10 dark:border-gray-600', className)}
    >
      <h3 className='mt-2'>
        <Accent>{title ?? 'We love to hear from you!'}</Accent> {'👋 '}
      </h3>
      <div className='mt-2 flex flex-row gap-10'>
        <div className='basis-1/2'>
          <p className='mt-2 text-justify text-gray-700 dark:text-gray-300'>
            {description}
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex basis-1/2 items-start'
        >
          <div className='space-y-5'>
            <input
              {...register('email')}
              className={clsx(
                'mt-2',
                'w-full rounded-md dark:bg-dark',
                'border border-gray-300 dark:border-gray-600',
                'text-sm md:text-base',
                'focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
              )}
              type='text'
              placeholder='👤 Name'
              required
            />
            <input
              {...register('email')}
              className={clsx(
                'mt-2',
                'w-full rounded-md dark:bg-dark',
                'border border-gray-300 dark:border-gray-600',
                'text-sm md:text-base',
                'focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
              )}
              type='text'
              placeholder='📞 Phone'
              required
            />
            <input
              {...register('email')}
              className={clsx(
                'mt-2',
                'w-full rounded-md dark:bg-dark',
                'border border-gray-300 dark:border-gray-600',
                'text-sm md:text-base',
                'focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
              )}
              type='email'
              placeholder='✉️ Email'
              required
            />
            <textarea
              {...register('email')}
              className={clsx(
                'mt-2',
                'h-40',
                'w-full rounded-md dark:bg-dark',
                'border border-gray-300 dark:border-gray-600',
                'text-sm md:text-base',
                'focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
              )}
              placeholder='👋 Leave us a message.'
              required
            />

            <div className='flex flex-wrap justify-end md:!text-lg'>
              <div className='group relative right-2'>
                <div
                  className={clsx(
                    'absolute -inset-0.5 animate-tilt rounded blur',
                    'bg-gradient-to-r from-primary-300 to-primary-400',
                    'dark:from-primary-200 dark:via-primary-300',
                    'opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
                  )}
                />
                <Button
                  type='submit'
                  isLoading={status === 'loading'}
                  className=''
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <p
        className={clsx(
          'mt-3 text-sm',
          status === 'success'
            ? 'text-green-500'
            : status === 'subscribed'
            ? 'text-yellow-500'
            : status === 'error'
            ? 'text-red-500 dark:text-red-400'
            : 'text-gray-700 dark:text-gray-300'
        )}
      >
        {status === 'success' ? (
          'Thanks, please confirm subscription on your email (check promotions or spam tab too)'
        ) : status === 'subscribed' ? (
          'You have subscribed to the newsletter, stay tuned!'
        ) : status === 'error' ? (
          <>
            {errMsg} Sorry! You can subscribe from the{' '}
            <CustomLink href='https://www.getrevue.co/profile/clarence'>
              revue website
            </CustomLink>{' '}
            instead.
          </>
        ) : status === 'loading' ? (
          'Loading...'
        ) : (
          ''
        )}
      </p>
    </div>
  );
}
