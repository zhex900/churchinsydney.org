import { InferGetStaticPropsType } from 'next';

import { getAllFilesFrontmatter } from '@/lib/mdx';
import { getTags, sortByDate } from '@/lib/mdx-client';

import Posts from '@/components/Posts';

export default function EventsPage({
  posts,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return Posts({ posts, tags, title: 'Events', filter: 'event' });
}

export async function getStaticProps() {
  const files = await getAllFilesFrontmatter('blog');
  const posts = sortByDate(files);

  // Accumulate tags and remove duplicate
  const tags = getTags(posts);

  return { props: { posts, tags } };
}
