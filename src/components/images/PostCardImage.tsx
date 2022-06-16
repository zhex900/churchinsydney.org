import clsx from 'clsx';
import { useContext } from 'react';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';

import useProtectPage from '@/hooks/useProtectPage';

import Image from '@/components/images/Image';

import { IMAGE_SIZE } from '@/constants';
import { AppContext } from '@/context/AppContext';

import { PostType } from '@/types/types';

function TopCornerIcon({ Icon }: { Icon: IconType }) {
  return (
    <div
      className={clsx(
        'absolute top-0 w-full px-4 py-2',
        'mt-2 flex flex-wrap justify-end gap-y-1 gap-x-2 text-sm text-black dark:text-gray-100'
      )}
    >
      <Icon
        tabIndex={-1}
        className='bg-opacity-80 text-2xl dark:!bg-opacity-60'
      />
    </div>
  );
}

function CardLock({
  haveAccess,
  isProtected,
}: {
  haveAccess: boolean;
  isProtected: boolean;
}) {
  if (!haveAccess) return <TopCornerIcon Icon={AiFillLock} />;

  if (isProtected) {
    return <TopCornerIcon Icon={AiFillUnlock} />;
  }

  return <div />;
}

export default function PostCardImage({ post }: { post: PostType }) {
  const { settings } = useContext(AppContext);
  const { haveAccess, isProtected } = useProtectPage(post.tags, settings);
  return (
    <>
      <Image
        noStyle
        className={clsx('pointer-events-none overflow-hidden rounded-t-md ', {
          'blur-sm': !haveAccess,
        })}
        url={post.banner}
        alt={post.slug}
        preview={false}
        {...IMAGE_SIZE}
      />
      <div className='pointer-events-none overflow-hidden rounded-t-md'></div>
      <CardLock haveAccess={haveAccess} isProtected={isProtected} />
    </>
  );
}
