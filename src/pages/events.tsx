import { InferGetStaticPropsType } from 'next';

import { getPostsByTags, getSetting } from '@/lib/graphcms';
import { getTags, sortByDate } from '@/lib/mdx-client';

import Posts from '@/components/Posts';

import { COOKIES } from '@/constants';

export default function EventsPage({
  posts,
  tags,
  memberPassword,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return Posts({
    posts,
    tags,
    memberPassword,
    title: 'Events',
    filter: 'event',
  });
}

export async function getStaticProps() {
  const posts = sortByDate(await getPostsByTags(['event']));
  const tags = getTags(posts);

  return {
    props: {
      posts,
      tags,
      memberPassword: await getSetting(COOKIES.MEMBERS_PASSWORD),
    },
  };
}
