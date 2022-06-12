import { flatten } from 'lodash';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import {
  getPostBySlug,
  getPostsSlugs,
  getSetting,
  getTranslationsByKeyStartsWith,
} from '@/lib/graphcms';
import { getRecommendations, parseMDX } from '@/lib/mdx';

import MembersPassword from '@/components/MembersPassword';
import Post from '@/components/Post';

import { COOKIES } from '@/constants';
import { TranslationContext } from '@/context/TranslationContext';

import { PostType, Translations } from '@/types/types';

type SinglePostPageProps = {
  post: PostType;
  recommendations: PostType[];
  memberPassword: string;
  translations: Translations;
};

export default function SinglePostPage({
  post,
  recommendations,
  memberPassword,
  translations,
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
      <TranslationContext.Provider value={translations}>
        <MembersPassword
          memberPassword={memberPassword}
          redirectTo={router.asPath}
        />
      </TranslationContext.Provider>
    );
  }
  return (
    <TranslationContext.Provider value={translations}>
      <Post
        post={post}
        memberPassword={memberPassword}
        recommendations={recommendations}
      />
    </TranslationContext.Provider>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = await getPostsSlugs();

  return {
    paths: flatten(
      slugs.map(({ slug }: { slug: string }) =>
        locales?.map((locale) => ({
          params: {
            slug,
          },
          locale,
        }))
      )
    ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  defaultLocale,
}) => {
  const locales = [locale || '', defaultLocale || ''];
  const post = await getPostBySlug(params?.slug as string, locales);
  const mdx = await parseMDX(post.content);

  const recommendations = await getRecommendations(
    params?.slug as string,
    locales
  );
  return {
    props: {
      post: {
        ...post,
        content: mdx,
      },
      recommendations,
      memberPassword: await getSetting(COOKIES.MEMBERS_PASSWORD),
      translations: await getTranslationsByKeyStartsWith(
        ['post', 'common'],
        locales
      ),
    },
  };
};
