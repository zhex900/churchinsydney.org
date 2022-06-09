import { InferGetStaticPropsType } from 'next';

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

export async function getStaticProps() {
  const posts = sortByDate(await getPosts());
  const tags = getTags(posts);

  return {
    props: {
      posts,
      tags,
      memberPassword: await getSetting(COOKIES.MEMBERS_PASSWORD),
    },
  };
}
