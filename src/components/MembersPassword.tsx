import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';

import Accent from '@/components/Accent';
import Button from '@/components/buttons/Button';

import { COOKIES } from '@/constants';
import { AppContext } from '@/context/AppContext';

import Layout from './layout/Layout';
import Seo from './Seo';

export default function MembersPassword({
  redirectTo,
}: {
  redirectTo: string;
}) {
  const { translations, settings } = useContext(AppContext);
  const [helperText, setHelperText] = useState(
    translations['post-member-login-helper-text']
  );
  const [password, setPassword] = useState('');
  const [, setCookie, removeCookie] = useCookies([COOKIES.MEMBERS_PASSWORD]);
  const router = useRouter();
  const memberPassword = settings[COOKIES.MEMBERS_PASSWORD];
  const onSubmit = () => {
    if (password !== memberPassword) {
      setHelperText(
        translations['post-member-login-incorrect-password-please-try-again']
      );
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
              <Accent>{translations['post-members-login']}</Accent>
            </h1>
            <div
              className={clsx(
                'mt-8 rounded border p-10 text-left dark:border-gray-600'
              )}
            >
              <div className='mt-2'>
                <Accent>{helperText}</Accent>
              </div>

              <div className='mt-5 flex flex-col'>
                <div className='space-y-5'>
                  <input
                    className={clsx(
                      'mt-2',
                      'w-full rounded-md dark:bg-dark',
                      'border border-gray-300 dark:border-gray-600',
                      'text-sm md:text-base',
                      'focus:border-primary-300 focus:outline-none focus:ring-0 dark:focus:border-primary-300'
                    )}
                    type='password'
                    placeholder={translations['post-member-login-password']}
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
                      <Button onClick={onSubmit}>
                        {translations['post-member-login-submit']}
                      </Button>
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
