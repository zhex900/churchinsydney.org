import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import {
  HiCalendar,
  HiEye,
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
} from 'react-icons/hi';

import { getTags, sortDateFn } from '@/lib/mdx-client';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import PostCard from '@/components/cards/PostCard';
import ContentPlaceholder from '@/components/content/ContentPlaceholder';
import Tag, { SkipNavTag } from '@/components/content/Tag';
import StyledInput from '@/components/form/StyledInput';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import SortListbox, { SortOption } from '@/components/SortListbox';

import { LAST_ORDER_INDEX } from '@/constants';

import { PostType } from '@/types/types';

const sortOptions: Array<SortOption> = [
  {
    id: 'rank',
    name: 'By rank',
    icon: HiEye,
  },
  {
    id: 'start-date',
    name: 'By start date',
    icon: HiCalendar,
  },
  {
    id: 'date-desc',
    name: 'By last update ↓',
    icon: HiOutlineChevronDoubleDown,
  },
  {
    id: 'date-asc',
    name: 'By last update ↑',
    icon: HiOutlineChevronDoubleUp,
  },
];

export type PostsPropsType = {
  posts: PostType[];
  tags: string[];
  title: string;
  filter?: string;
  memberPassword: string;
};

export default function Posts({
  posts,
  tags,
  title,
  memberPassword,
  filter = '',
}: PostsPropsType) {
  const { route } = useRouter();
  const [sortOrder, setSortOrder] = React.useState<SortOption>(
    () => sortOptions[0]
  );
  React.useEffect(() => {
    if (route.includes('event')) {
      setSortOrder(sortOptions[1]);
    }
  }, [route]);
  const [mounted, setMounted] = React.useState(false);
  const isLoaded = useLoaded();

  const [search, setSearch] = React.useState<string>(filter);
  const [filteredPosts, setFilteredPosts] =
    React.useState<Array<PostType>>(posts);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        (post?.description &&
          post?.description.toLowerCase().includes(search.toLowerCase())) ||
        // Check if splitted search contained in tag
        search
          .toLowerCase()
          .split(' ')
          .every((tag) => post.tags.includes(tag))
    );

    if (sortOrder.id === 'start-date') {
      results.sort((a, b) => {
        if (!a?.eventDate && !b?.eventDate) {
          return 0;
          // sort b before a
        } else if (!a?.eventDate && b?.eventDate) {
          return 1;
        } // sort a before b
        else if (!b?.eventDate && a?.eventDate) {
          return -1;
        }

        return (
          new Date(a?.eventDate?.startDate ?? 0).valueOf() -
          new Date(b?.eventDate?.startDate ?? 0).valueOf()
        );
      });
    } else if (sortOrder.id === 'rank') {
      results.sort(sortDateFn).sort((a, b) => {
        return (a.rank ?? LAST_ORDER_INDEX) - (b.rank ?? LAST_ORDER_INDEX);
      });
    } else if (sortOrder.id === 'date-desc') {
      results.sort(sortDateFn);
    } else {
      results.sort((a, b) => sortDateFn(b, a));
    }

    setFilteredPosts(results);
  }, [search, sortOrder.id, posts]);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTag = (tag: string) => {
    // If tag is already there, then remove
    if (search.includes(tag)) {
      setSearch((s) =>
        s
          .split(' ')
          .filter((t) => t !== tag)
          ?.join(' ')
      );
    } else {
      // append tag
      setSearch((s) => (s !== '' ? `${s.trim()} ${tag}` : tag));
    }
  };

  /** Currently available tags based on filtered posts */
  const filteredTags = getTags(filteredPosts);

  /** Show accent if not disabled and selected  */
  const checkTagged = (tag: string) => {
    return (
      filteredTags.includes(tag) &&
      search.toLowerCase().split(' ').includes(tag)
    );
  };

  return (
    <Layout>
      <Seo templateTitle={title} description={title} />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout py-12'>
            <h1 className='text-3xl md:text-5xl' data-fade='0'>
              <Accent>{title}</Accent>
            </h1>
            {!filter && (
              <>
                <StyledInput
                  data-fade='1'
                  className='mt-4'
                  placeholder='Search...'
                  onChange={handleSearch}
                  value={search}
                  type='text'
                />
                <div
                  className='mt-2 flex flex-wrap items-baseline justify-start gap-2 text-sm text-gray-600 dark:text-gray-300'
                  data-fade='2'
                >
                  <span className='font-medium'>Choose topic:</span>
                  <SkipNavTag>
                    {tags.map((tag) => (
                      <Tag
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        disabled={!filteredTags.includes(tag)}
                      >
                        {checkTagged(tag) ? <Accent>{tag}</Accent> : tag}
                      </Tag>
                    ))}
                  </SkipNavTag>
                </div>
              </>
            )}

            <div
              className='relative z-10 mt-6 flex flex-col items-end gap-4 text-gray-600 dark:text-gray-300 md:flex-row md:items-end md:justify-end'
              data-fade='4'
            >
              <SortListbox
                selected={sortOrder}
                setSelected={setSortOrder}
                options={sortOptions}
              />
            </div>
            <ul
              className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
              data-fade='5'
            >
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard
                    memberPassword={memberPassword}
                    key={post.slug}
                    post={post}
                    checkTagged={checkTagged}
                  />
                ))
              ) : (
                <ContentPlaceholder />
              )}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}
