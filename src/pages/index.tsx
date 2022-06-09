/* eslint-disable react/jsx-key */
import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { IoArrowDownOutline } from 'react-icons/io5';
import { InView } from 'react-intersection-observer';

import { getPostsByTags, getSetting } from '@/lib/graphcms';
import { generateRss } from '@/lib/rss';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import PostCard from '@/components/cards/PostCard';
import HeroImage from '@/components/images/HeroImage';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import Tooltip from '@/components/tooltip/Tooltip';

import { COOKIES } from '@/constants';

export default function IndexPage({
  currentEvents,
  featuredPosts,
  memberPassword,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isLoaded = useLoaded();
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div />;
  return (
    <Layout>
      <Seo />

      <main>
        <section
          className={clsx(
            'min-h-main -mt-20 mb-20 flex flex-col justify-center',
            isLoaded && 'fade-in-start'
          )}
        >
          <article className='layout'>
            <h1
              className='mt-1 text-3xl md:text-5xl 2xl:text-6xl'
              data-fade='2'
            >
              <Trans
                i18nKey='common:hero-banner'
                components={[
                  <Accent />,
                  <Accent />,
                  <br />,
                  <span className='mt-1 max-w-4xl leading-relaxed text-gray-700 dark:text-gray-200 md:mt-1 md:text-lg 2xl:text-xl' />,
                ]}
              />
            </h1>
            <div
              data-fade='5'
              className='mt-8 flex flex-wrap gap-4 md:!text-lg'
            >
              <div className='group relative'>
                <div
                  className={clsx(
                    'absolute -inset-0.5 animate-tilt rounded blur',
                    'bg-gradient-to-r from-primary-300 to-primary-400',
                    'dark:from-primary-200 dark:via-primary-300',
                    'opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
                  )}
                />
                <ButtonLink href='#intro'>{t('members-login')}</ButtonLink>
              </div>
            </div>
          </article>
          <UnstyledLink
            href='#intro'
            className={clsx(
              'absolute bottom-2 left-1/2 -translate-x-1/2 md:bottom-10',
              'cursor-pointer rounded-md transition-colors',
              'hover:text-primary-300 focus-visible:text-primary-300'
            )}
          >
            <IoArrowDownOutline className='h-8 w-8 animate-bounce md:h-10 md:w-10' />
          </UnstyledLink>
          <HeroImage
            className={clsx(
              'absolute right-0 bottom-5 md:bottom-0',
              'w-[calc(100%-3rem)] md:w-[600px] 2xl:w-[900px]',
              'opacity-35 z-[-1] dark:opacity-40'
            )}
          />
        </section>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              id='intro'
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article
                className={clsx(
                  'layout flex flex-col-reverse items-center md:flex-row md:justify-start',
                  'md:gap-4'
                )}
                data-fade='0'
              >
                <div className='mt-8 h-full w-full md:mt-0'>
                  <h2 className='text-4xl md:text-6xl'>
                    <Accent className='inline decoration-clone leading-snug dark:leading-none'>
                      Wonderful Church Life!
                    </Accent>
                  </h2>
                  <div className='mt-4 text-base text-gray-600 dark:text-gray-300 md:text-lg'>
                    God's heart and will in His New Testament{' '}
                    <Tooltip
                      withUnderline
                      content={
                        <>
                          The Greek word means <strong>household law</strong>,{' '}
                          implying distribution (the base of this word is the
                          same origin as the for pasture in John 10:9, implying
                          a distribution of the pasture to the flock). It
                          denotes a household management.
                        </>
                      }
                    >
                      economy
                    </Tooltip>
                    , God's good pleasure, the counsel of His will, and His
                    purpose are to have a{' '}
                    <strong className='text-gray-700 dark:text-gray-200'>
                      Body{' '}
                    </strong>{' '}
                    for the enlargement and expression of Christ, the embodiment
                    of the processed Triune God. (Eph. 1:9-11; 3:9-11)
                    <br />
                    <span className='italic'>
                      The Practical and Organic Building Up of the Church
                    </span>
                  </div>
                </div>
                <div className='h-full w-full'>
                  <ul className='relative h-full'>
                    {featuredPosts.length > 1 && (
                      <PostCard
                        className={clsx(
                          'absolute max-w-[350px] transform-gpu',
                          'top-1/2 translate-y-[-55%] md:translate-y-[-50%] lg:translate-y-[-60%]',
                          'left-1/2 -translate-x-1/2 md:translate-x-[-50%] lg:translate-x-[-30%]',
                          'rotate-3 md:rotate-6 lg:rotate-12',
                          'pointer-events-none md:pointer-events-auto'
                        )}
                        post={featuredPosts[1]}
                        memberPassword={memberPassword}
                      />
                    )}
                    {featuredPosts.length > 0 && (
                      <PostCard
                        className='mx-auto max-w-[350px]'
                        post={featuredPosts[0]}
                        memberPassword={memberPassword}
                      />
                    )}
                  </ul>
                </div>
              </article>
            </section>
          )}
        </InView>
        {currentEvents.length && (
          <InView triggerOnce rootMargin='-40% 0px'>
            {({ ref, inView }) => (
              <section
                ref={ref}
                className={clsx('py-20', inView && 'fade-in-start')}
              >
                <article className='layout' data-fade='0'>
                  <h2 className='text-2xl md:text-4xl' id='posts'>
                    <Accent>Current Events</Accent>
                  </h2>
                  <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                    {currentEvents.map((post, i) => (
                      <PostCard
                        key={post.slug}
                        post={post}
                        className={clsx(i > 2 && 'hidden sm:block')}
                        memberPassword={memberPassword}
                      />
                    ))}
                  </ul>
                  <ButtonLink className='mt-4' href='/events'>
                    See more events
                  </ButtonLink>
                </article>
              </section>
            )}
          </InView>
        )}
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  generateRss();

  return {
    props: {
      currentEvents: await getPostsByTags(['event']),
      featuredPosts: await getPostsByTags(['featured']),
      //@TODO Retrieve the password once and share it across all components
      memberPassword: await getSetting(COOKIES.MEMBERS_PASSWORD),
    },
  };
}
