import clsx from 'clsx';
import Trans from 'next-translate/Trans';
import { IoArrowDownOutline } from 'react-icons/io5';
import { InView } from 'react-intersection-observer';

import {
  getLinks,
  getPostsByTags,
  getSettings,
  getTranslationsByKeyStartsWith,
} from '@/lib/graphcms';
import { generateRss } from '@/lib/rss';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import PostCard from '@/components/cards/PostCard';
import HeroImage from '@/components/images/HeroImage';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import { COOKIES } from '@/constants';
import { AppContext } from '@/context/AppContext';

import { Links, PostType, Settings, Translations } from '@/types/types';

export default function IndexPage({
  currentEvents,
  featuredPosts,
  translations,
  links,
  settings,
}: {
  currentEvents: PostType[];
  featuredPosts: PostType[];
  translations: Translations;
  links: Links;
  settings: Settings;
}) {
  const isLoaded = useLoaded();
  return (
    <AppContext.Provider
      value={{
        translations,
        memberPassword: settings[COOKIES.MEMBERS_PASSWORD],
        links,
        settings,
      }}
    >
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
                  i18nKey='common:home-page-verse'
                  components={[
                    <Accent key='1' />,
                    <Accent key='1' />,
                    <br key='1' />,
                    <span
                      key='1'
                      className='mt-1 max-w-4xl leading-relaxed text-gray-700 dark:text-gray-200 md:mt-1 md:text-lg 2xl:text-xl'
                    />,
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
                  <ButtonLink href='#intro'>
                    {translations['home-welcome'].text}
                  </ButtonLink>
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
                        {translations['home-introduction-title'].text}
                      </Accent>
                    </h2>
                    <div className='mt-4 text-base text-gray-600 dark:text-gray-300 md:text-lg'>
                      {translations['home-quote'].text}
                      <span className='italic'>
                        {translations['home-quote-reference'].text}
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
                        />
                      )}
                      {featuredPosts.length > 0 && (
                        <PostCard
                          className='mx-auto max-w-[350px]'
                          post={featuredPosts[0]}
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
                      <Accent>
                        {translations['home-current-events'].text}
                      </Accent>
                    </h2>
                    <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                      {currentEvents.map((post, i) => (
                        <PostCard
                          key={post.slug}
                          post={post}
                          className={clsx(i > 2 && 'hidden sm:block')}
                        />
                      ))}
                    </ul>
                    <ButtonLink className='mt-4' href='/events'>
                      {translations['home-see-more-events'].text}
                    </ButtonLink>
                  </article>
                </section>
              )}
            </InView>
          )}
        </main>
      </Layout>
    </AppContext.Provider>
  );
}

export async function getStaticProps({
  locale,
  defaultLocale,
}: {
  locale: string;
  defaultLocale: string;
}) {
  generateRss();
  return {
    props: {
      currentEvents: await getPostsByTags(['event']),
      featuredPosts: await getPostsByTags(['featured']),
      settings: await getSettings(),
      translations: await getTranslationsByKeyStartsWith(
        ['home', 'common', 'post'],
        [locale, defaultLocale]
      ),
      links: await getLinks([locale, defaultLocale]),
    },
  };
}
