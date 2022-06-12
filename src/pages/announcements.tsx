import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { getPosts, getSetting } from '@/lib/graphcms';
import { getTags, sortByDate } from '@/lib/mdx-client';

import Posts from '@/components/Posts';

import { COOKIES } from '@/constants';

export default function AnnouncementsPage({
  posts,
  tags,
  memberPassword,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return Posts({ posts, tags, memberPassword, title: 'Announcements' });
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
      // translations: await getTranslationsByKeyStartsWith('home', [locale]),
    },
  };
}
