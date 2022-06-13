import { InferGetStaticPropsType } from 'next';

import {
  getLinks,
  getPostsByTags,
  getSettings,
  getTranslationsByKeyStartsWith,
} from '@/lib/graphcms';
import { getTags, sortByDate } from '@/lib/mdx-client';

import Posts from '@/components/Posts';

import { COOKIES } from '@/constants';
import { AppContext } from '@/context/AppContext';

export default function EventsPage({
  posts,
  tags,
  translations,
  links,
  settings,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AppContext.Provider
      value={{
        translations,
        memberPassword: settings[COOKIES.MEMBERS_PASSWORD],
        settings,
        links,
      }}
    >
      <Posts
        {...{
          posts,
          tags,
          title: 'Events',
          filter: 'event',
        }}
      />
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
  const posts = sortByDate(await getPostsByTags(['event']));
  const tags = getTags(posts);

  return {
    props: {
      posts,
      tags,
      settings: await getSettings(),
      translations: await getTranslationsByKeyStartsWith(
        ['common', 'post'],
        [locale, defaultLocale]
      ),
      links: await getLinks([locale, defaultLocale]),
    },
  };
}
