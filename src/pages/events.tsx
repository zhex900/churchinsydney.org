import { InferGetStaticPropsType } from 'next';

import { getPostsByTags } from '@/lib/graphcms';
import { getTags, sortByDate } from '@/lib/mdx-client';

import Posts from '@/components/Posts';

export default function EventsPage({
  posts,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return Posts({ posts, tags, title: 'Events', filter: 'event' });
}

export async function getStaticProps() {
  const posts = sortByDate(await getPostsByTags(['event']));
  const tags = getTags(posts);

  return { props: { posts, tags } };
}
