import { InferGetStaticPropsType } from 'next';

import {
  getPosts,
  getSetting,
  getTranslationsByKeyStartsWith,
} from '@/lib/graphcms';
import { getTags, sortByDate } from '@/lib/mdx-client';

import Posts from '@/components/Posts';

import { COOKIES } from '@/constants';
import { AppContext } from '@/context/AppContext';

export default function AnnouncementsPage({
  posts,
  tags,
  memberPassword,
  translations,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AppContext.Provider value={{ translations, memberPassword }}>
      <Posts
        {...{
          posts,
          tags,
          memberPassword,
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
      memberPassword: await getSetting(COOKIES.MEMBERS_PASSWORD),
      translations: await getTranslationsByKeyStartsWith(
        ['common', 'post'],
        [locale, defaultLocale]
      ),
    },
  };
}
