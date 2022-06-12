import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';

import Image from '@/components/images/Image';

import { COOKIES, IMAGE_SIZE } from '@/constants';
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
  tags,
  haveAccess,
}: {
  tags: string[];
  haveAccess: boolean;
}) {
  if (!haveAccess) return <TopCornerIcon Icon={AiFillLock} />;

  if (tags.includes('members')) {
    return <TopCornerIcon Icon={AiFillUnlock} />;
  }

  return <div />;
}

export default function PostCardImage({ post }: { post: PostType }) {
  const [haveAccess, setHaveAccess] = useState(false);
  const [cookies] = useCookies([COOKIES.MEMBERS_PASSWORD]);
  const { memberPassword } = useContext(AppContext);

  useEffect(() => {
    setHaveAccess(
      cookies?.MEMBERS_PASSWORD === memberPassword ||
        !post.tags.includes('members')
    );
  }, [cookies?.MEMBERS_PASSWORD, memberPassword, post.tags]);

  return (
    <>
      <Image
        noStyle
        className={clsx('pointer-events-none overflow-hidden rounded-t-md ', {
          'blur-sm': !haveAccess,
        })}
        url={post.banner.url}
        alt={post.slug}
        preview={false}
        {...IMAGE_SIZE}
      />
      <div className='pointer-events-none overflow-hidden rounded-t-md'></div>
      <CardLock tags={post.tags} haveAccess={haveAccess} />
    </>
  );
}
