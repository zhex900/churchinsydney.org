import clsx from 'clsx';
import { format, formatDistanceToNow, isSameDay } from 'date-fns';
import { getMDXComponent } from 'mdx-bundler/client';
import { useEffect, useMemo, useState } from 'react';
import { HiOutlineClock } from 'react-icons/hi';

import { trackEvent } from '@/lib/analytics';
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

import { PostType } from '@/types/types';

type PostProps = {
  post: PostType;
  recommendations: PostType[];
  memberPassword: string;
};

export default function Post({
  post,
  memberPassword,
  recommendations,
}: PostProps) {
  const [toc, setToc] = useState<HeadingScrollSpy>();
  const Component = useMemo(
    () => getMDXComponent(post.content),
    [post.content]
  );

  const activeSection = useScrollSpy();

  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0;

  useEffect(() => {
    const headings = document.querySelectorAll('.mdx h1, .mdx h2, .mdx h3');

    const headingArr: HeadingScrollSpy = [];
    headings.forEach((heading) => {
      const id = heading.id;
      const level = +heading.tagName.replace('H', '');
      const text = heading.textContent + '';

      headingArr.push({ id, level, text });
    });

    setToc(headingArr);
  }, [post.content]);

  const eventDate = post?.eventDate ? formatEventDate(post?.eventDate) : null;

  return (
    <Layout>
      <Seo
        templateTitle={post.title}
        description={post.description}
        date={new Date(post.updatedAt ?? post.createdAt).toISOString()}
      />

      <main>
        <section className=''>
          <div className='layout'>
            <div className='pb-4 dark:border-gray-600'>
              <Image url={post.banner.url} alt={post.slug} {...IMAGE_SIZE} />

              <h1 className='mt-4'>{post.title}</h1>

              {eventDate && (
                <p className='mt-2 text-2xl italic text-gray-600 dark:text-gray-300'>
                  {eventDate}
                </p>
              )}
              {post.updatedAt && (
                <div className='mt-4 flex flex-wrap gap-2 text-sm italic text-gray-700 dark:text-gray-200'>
                  <p>
                    Last updated:{' '}
                    {!isSameDay(
                      new Date(post.createdAt),
                      new Date(post.updatedAt)
                    ) && `${format(new Date(post.updatedAt), DATE_FORMAT)}, `}
                    {`${formatDistanceToNow(new Date(post.updatedAt))} ago`}
                  </p>
                </div>
              )}
              <div className='mt-4 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300'>
                <div className='flex items-center gap-1'>
                  <HiOutlineClock className='inline-block text-base' />
                  <Accent>{post.readingTime.text}</Accent>
                </div>
              </div>
            </div>

            <hr className='dark:border-gray-600' />

            <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
              <article className='mdx prose mx-auto mt-4 w-full transition-colors dark:prose-invert'>
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
                  <TableOfContents
                    toc={toc}
                    minLevel={minLevel}
                    activeSection={activeSection}
                  />
                  {/* <div className='flex items-center justify-center py-8'>
                    <LikeButton slug={contentSlug} />
                  </div> */}
                </div>
              </aside>
            </section>

            {recommendations.length > 0 && (
              <div className='mt-20'>
                <h2>
                  <Accent>Other posts that you might like</Accent>
                </h2>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {recommendations.map((post, i) => (
                    <PostCard
                      onClick={() => {
                        trackEvent(post.slug, 'recommend');
                      }}
                      memberPassword={memberPassword}
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
