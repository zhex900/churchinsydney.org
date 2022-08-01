import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { useContext } from 'react';
import { useEffect, useState } from 'react';

import { formatEventDate } from '@/lib/utils';

import Accent from '@/components/Accent';
import Tag from '@/components/content/Tag';
import PostCardImage from '@/components/images/PostCardImage';
import UnstyledLink from '@/components/links/UnstyledLink';

import { AppContext } from '@/context/AppContext';

import { PostType } from '@/types/types';
type PostCardProps = {
  post: PostType;
  checkTagged?: (tag: string) => boolean;
} & React.ComponentPropsWithoutRef<'li'>;

export default function PostCard({
  post,
  className,
  checkTagged,
  onClick,
}: PostCardProps) {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // prevent server side rendering
    if (post.dateUpdated && window) {
      setLastUpdated(formatDistanceToNow(new Date(post.dateUpdated)));
    }
  }, [post.dateUpdated]);

  const eventDate =
    post.start && post.end ? formatEventDate(post.start, post.end) : null;

  const { translations: t } = useContext(AppContext);
  return (
    <li
      className={clsx(
        'w-full rounded-md bg-white  dark:bg-dark',
        'scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu',
        'transition duration-100',
        'motion-reduce:hover:scale-100',
        'animate-shadow',
        className
      )}
      onClick={onClick}
    >
      <UnstyledLink
        className='block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
        href={`/${post.slug}`}
      >
        <div className='relative'>
          <PostCardImage post={post} />
          <div
            className={clsx(
              'absolute bottom-0 w-full px-4 py-2',
              'mt-2 flex flex-wrap justify-end gap-y-1 gap-x-2 text-sm text-black dark:text-gray-100'
            )}
          >
            {post.tags.map((tag) => (
              <Tag
                tabIndex={-1}
                className='bg-opacity-80 dark:!bg-opacity-60'
                key={tag}
              >
                {checkTagged?.(tag) ? <Accent>{tag}</Accent> : tag}
              </Tag>
            ))}
          </div>
        </div>
        <div className='p-4'>
          <h4 className='text-gray-800 dark:text-gray-100'>{post.title}</h4>
          <p className='mt-4 text-base text-gray-600 dark:text-gray-300'>
            <span className='italic text-gray-800 dark:text-gray-100'>
              {eventDate ? eventDate : post.summary}
            </span>
          </p>
          <p className='mt-2 mb-2 text-xs '>
            {post.dateUpdated && (
              <span className='italic text-gray-400 dark:text-gray-500'>
                {`${t['post-last-updated']}: ${lastUpdated} ${t['post-ago']}`}
              </span>
            )}
          </p>
        </div>
      </UnstyledLink>
    </li>
  );
}
