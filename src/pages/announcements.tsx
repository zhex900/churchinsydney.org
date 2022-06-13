import { InferGetStaticPropsType } from 'next';

import {
  getLinks,
  getPosts,
  getSettings,
  getTranslationsByKeyStartsWith,
} from '@/lib/graphcms';
import { getTags, sortByDate } from '@/lib/mdx-client';

import Posts from '@/components/Posts';

import { COOKIES } from '@/constants';
import { AppContext } from '@/context/AppContext';

export default function AnnouncementsPage({
  posts,
  tags,
  settings,
  translations,
  links,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AppContext.Provider
      value={{
        translations,
        settings,
        memberPassword: settings[COOKIES.MEMBERS_PASSWORD],
        links,
      }}
    >
      <Posts
        {...{
          posts,
          tags,
          title: 'Announcements',
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
  const posts = sortByDate(await getPosts([locale, defaultLocale]));
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
