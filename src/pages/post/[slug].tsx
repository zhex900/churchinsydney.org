import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { getPostBySlug, getPostsSlugs, getSetting } from '@/lib/graphcms';
import { getRecommendations, parseMDX } from '@/lib/mdx';

import MembersPassword from '@/components/MembersPassword';
import Post from '@/components/Post';

import { COOKIES } from '@/constants';

import { PostType } from '@/types/post';

type SinglePostPageProps = {
  post: PostType;
  recommendations: PostType[];
  memberPassword: string;
};

export default function SinglePostPage({
  post,
  recommendations,
  memberPassword,
}: SinglePostPageProps) {
  const router = useRouter();
  const [haveAccess, setHaveAccess] = useState<boolean | null>(null);
  const [cookies] = useCookies([COOKIES.MEMBERS_PASSWORD]);

  useEffect(() => {
    setHaveAccess(
      cookies?.MEMBERS_PASSWORD === memberPassword ||
        !post.tags.includes('members')
    );
  }, [cookies?.MEMBERS_PASSWORD, memberPassword, post.tags]);

  if (!haveAccess && haveAccess !== null) {
    return (
      <MembersPassword
        memberPassword={memberPassword}
        redirectTo={router.asPath}
      />
    );
  }
  return (
    <Post
      post={post}
      memberPassword={memberPassword}
      recommendations={recommendations}
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getPostsSlugs();
  return {
    paths: slugs.map(({ slug }: { slug: string }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostBySlug(params?.slug as string);
  const mdx = await parseMDX(post.content);

  const recommendations = await getRecommendations(params?.slug as string);
  return {
    props: {
      post: {
        ...post,
        content: mdx,
      },
      recommendations,
      memberPassword: await getSetting(COOKIES.MEMBERS_PASSWORD),
    },
  };
};
