import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

import Accent from '@/components/Accent';
import Button from '@/components/buttons/Button';

import { COOKIES } from '@/constants';

import Layout from './layout/Layout';
import Seo from './Seo';

const INITIAL_HELPER_TEXT = "Please enter member's password";

export default function MembersPassword({
  redirectTo,
  memberPassword,
}: {
  memberPassword: string;
  redirectTo: string;
}) {
  const [helperText, setHelperText] = useState(INITIAL_HELPER_TEXT);
  const [password, setPassword] = useState('');
  const [, setCookie, removeCookie] = useCookies([COOKIES.MEMBERS_PASSWORD]);
  const router = useRouter();
  const onSubmit = () => {
    if (password !== memberPassword) {
      setHelperText('Incorrect password. Please try again.');
      return;
    }
    removeCookie(COOKIES.MEMBERS_PASSWORD);
    setCookie(COOKIES.MEMBERS_PASSWORD, password, {
      path: `/`,
    });
    router.push(redirectTo);
  };

  return (
    <Layout>
      <Seo templateTitle="Member's Password" description='' />

      <main>
        <section className=''>
          <div className='layout flex flex-col items-center py-20 text-center'>
            <h1>
              <Accent>Member's Login</Accent>
            </h1>
            <div
              className={clsx(
                'mt-8 rounded border p-10 text-left dark:border-gray-600'
              )}
            >
              <div className='mt-2'>
                <Accent>{helperText}</Accent>
              </div>

              <div
                // onSubmit={handleSubmit(onSubmit)}
                className='mt-5 flex flex-col'
              >
                <div className='space-y-5'>
                  <input
                    className={clsx(
                      'mt-2',
                      'w-full rounded-md dark:bg-dark',
                      'border border-gray-300 dark:border-gray-600',
                      'text-sm md:text-base',
                      'focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300',
                      {
                        'border-red-500': helperText !== INITIAL_HELPER_TEXT,
                      }
                    )}
                    type='password'
                    placeholder='🔐 Password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className='flex flex-wrap justify-end md:!text-lg'>
                    <div className='group relative right-2'>
                      <div
                        className={clsx(
                          'dark:from-primary-200 dark:via-primary-300',
                          'opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
                        )}
                      />
                      <Button onClick={onSubmit}>Submit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
