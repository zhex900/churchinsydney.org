import { InferGetStaticPropsType } from 'next';

import {
  getPostsByTags,
  getSetting,
  getTranslationsByKeyStartsWith,
} from '@/lib/graphcms';
import { getTags, sortByDate } from '@/lib/mdx-client';

import Posts from '@/components/Posts';

import { COOKIES } from '@/constants';
import { TranslationContext } from '@/context/TranslationContext';

export default function EventsPage({
  posts,
  tags,
  memberPassword,
  translations,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <TranslationContext.Provider value={translations}>
      <Posts
        {...{
          posts,
          tags,
          memberPassword,
          title: 'Events',
          filter: 'event',
        }}
      />
    </TranslationContext.Provider>
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
      memberPassword: await getSetting(COOKIES.MEMBERS_PASSWORD),
      translations: await getTranslationsByKeyStartsWith(
        ['common', 'post'],
        [locale, defaultLocale]
      ),
    },
  };
}
