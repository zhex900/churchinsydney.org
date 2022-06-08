import { InferGetStaticPropsType } from 'next';

import { getPosts } from '@/lib/graphcms';
import { getTags, sortByDate } from '@/lib/mdx-client';

import Posts from '@/components/Posts';

export default function AnnouncementsPage({
  posts,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return Posts({ posts, tags, title: 'Announcements' });
}

export async function getStaticProps() {
  const posts = sortByDate(await getPosts());
  const tags = getTags(posts);

  return { props: { posts, tags } };
}
