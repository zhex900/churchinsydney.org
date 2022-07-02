import clsx from 'clsx';
import { IoArrowDownOutline } from 'react-icons/io5';
import { InView } from 'react-intersection-observer';

import { generateRss } from '@/lib/rss';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import PostCard from '@/components/cards/PostCard';
import HeroImage from '@/components/images/HeroImage';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import Trans from '@/components/translation/Trans';

import {
  getLinks,
  getPostsByTags,
  getSettings,
  getTranslationsByNamespace,
} from '@/cms';
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
                data-testid='home-verse'
              >
                <Trans
                  text={translations['home-verse']}
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
                      'dark:from-primary-200 dark:via-primary-300',
                      'opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
                    )}
                  />
                  <ButtonLink href='#intro'>
                    {translations['home-welcome']}
                  </ButtonLink>
                </div>
              </div>
            </article>
            <UnstyledLink
              data-testid='home-scroll-down'
              href='#intro'
              className={clsx(
                'absolute bottom-2 left-1/2 -translate-x-1/2 md:bottom-10',
                'cursor-pointer rounded-md transition-colors',
                'hover:text-primary-300 focus-visible:text-primary-300'
              )}
            >
              <IoArrowDownOutline className='h-8 w-8 animate-bounce md:h-10 md:w-10' />
            </UnstyledLink>
            {settings['show-hero-image'] === 'true' && (
              <HeroImage
                className={clsx(
                  'absolute right-0 bottom-5 md:bottom-0',
                  'w-[calc(100%-3rem)] md:w-[600px] 2xl:w-[900px]',
                  'opacity-35 z-[-1] dark:opacity-40'
                )}
              />
            )}
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
                    <h2
                      className='text-4xl md:text-6xl'
                      data-testid='home-introduction-title'
                    >
                      <Accent className='inline decoration-clone leading-snug dark:leading-none'>
                        {translations['home-introduction-title']}
                      </Accent>
                    </h2>
                    <div
                      className='mt-4 text-base text-gray-600 dark:text-gray-300 md:text-lg'
                      data-testid='home-quote'
                    >
                      {translations['home-quote']}
                      <span className='italic'>
                        {translations['home-quote-reference']}
                      </span>
                    </div>
                  </div>
                  <div className='h-full w-full'>
                    <ul className='relative h-full'>
                      {featuredPosts.length > 1 && (
                        <PostCard
                          aria-label='featured post 1'
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
                          aria-label='featured post 2'
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
          {currentEvents.length > 0 && (
            <InView triggerOnce rootMargin='-40% 0px'>
              {({ ref, inView }) => (
                <section
                  ref={ref}
                  className={clsx('py-20', inView && 'fade-in-start')}
                >
                  <article className='layout' data-fade='0'>
                    <h2 className='text-2xl md:text-4xl' id='posts'>
                      <Accent>{translations['home-current-events']}</Accent>
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
                      {translations['home-see-more-events']}
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

export async function getStaticProps({ locale }: { locale: string }) {
  generateRss();

  return {
    props: {
      currentEvents: await getPostsByTags(['Event'], locale),
      featuredPosts: await getPostsByTags(['Featured'], locale),
      settings: await getSettings(),
      translations: await getTranslationsByNamespace(
        ['home', 'common', 'post'],
        locale
      ),
      links: await getLinks(locale),
    },
  };
}
