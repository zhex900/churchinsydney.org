import clsx from 'clsx';
import { format, formatDistanceToNow, isSameDay } from 'date-fns';
import { getMDXComponent } from 'mdx-bundler/client';
import { useContext, useEffect, useMemo, useState } from 'react';

import { formatEventDate } from '@/lib/utils';
import useScrollSpy from '@/hooks/useScrollspy';

import Accent from '@/components/Accent';
import PostCard from '@/components/cards/PostCard';
import MDXComponents from '@/components/content/MDXComponents';
import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/content/TableOfContents';
import Image from '@/components/images/Image';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { DATE_FORMAT, IMAGE_SIZE } from '@/constants';
import { AppContext } from '@/context/AppContext';

import { PostType } from '@/types/types';

type PostProps = {
  post: PostType;
  recommendations: PostType[];
};

export default function Post({ post, recommendations }: PostProps) {
  const { translations: t } = useContext(AppContext);
  const [toc, setToc] = useState<HeadingScrollSpy>([]);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // prevent server side rendering
    if (post.dateUpdated && window) {
      setLastUpdated(formatDistanceToNow(new Date(post.dateUpdated)));
    }
  }, [post.dateUpdated]);

  const Component = useMemo(
    () => getMDXComponent(post.body as string),
    [post.body]
  );

  const activeSection = useScrollSpy();

  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0;

  useEffect(() => {
    const headings = document
      ?.querySelector('#post-content')
      ?.querySelectorAll('h1, h2, h3');

    const headingArr: HeadingScrollSpy = [];
    headings?.forEach((heading) => {
      const id = heading.id;
      const level = +heading.tagName.replace('H', '');
      const text = heading.textContent + '';

      headingArr.push({ id, level, text });
    });

    setToc(headingArr);
  }, [post.body]);

  const eventDate =
    post.start && post.end ? formatEventDate(post.start, post.end) : null;

  return (
    <Layout>
      <Seo
        templateTitle={post.title}
        description={post.summary || ''}
        date={new Date(post.dateCreated).toISOString()}
      />

      <main suppressHydrationWarning>
        <section>
          <div className='layout'>
            <div className='pb-4 dark:border-gray-600'>
              <Image url={post.banner} alt={post.slug} {...IMAGE_SIZE} />

              <h1 className='mt-4'>{post.title}</h1>

              {eventDate && (
                <p className='mt-4 text-2xl italic text-gray-600 dark:text-gray-300'>
                  {eventDate}
                </p>
              )}
              {post.dateUpdated && (
                <div className='mt-2 flex flex-wrap gap-2 text-sm italic text-gray-400 dark:text-gray-500'>
                  <p>
                    {t['post-last-updated']}:{' '}
                    {!isSameDay(
                      new Date(post.dateCreated),
                      new Date(post.dateUpdated)
                    ) &&
                      `${format(
                        new Date(post.dateCreated),

                        DATE_FORMAT
                      )}, `}
                    {`${lastUpdated} ${t['post-ago']}`}
                  </p>
                </div>
              )}
            </div>

            <hr className='dark:border-gray-600' />

            <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
              <article
                id='post-content'
                className='rich-text prose mx-auto mt-4 w-full transition-colors dark:prose-invert'
              >
                <Component
                  components={
                    {
                      ...MDXComponents,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any
                  }
                />
              </article>

              <aside className='py-4'>
                <div className='sticky top-36'>
                  {toc.length > 0 && (
                    <TableOfContents
                      toc={toc}
                      minLevel={minLevel}
                      activeSection={activeSection}
                    />
                  )}
                </div>
              </aside>
            </section>

            {recommendations.length > 0 && (
              <div className='mt-20'>
                <h2>
                  <Accent>{t['post-you-might-also-like']}</Accent>
                </h2>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {recommendations.map((post, i) => (
                    <PostCard
                      className={clsx({ 'hidden xl:block': i === 2 })}
                      key={post.slug}
                      post={post}
                    />
                  ))}
                </ul>
              </div>
            )}

            <div className='mb-8 mt-8 flex flex-col items-start gap-4' />
          </div>
        </section>
      </main>
    </Layout>
  );
}
