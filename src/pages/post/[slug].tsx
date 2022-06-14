import { flatten } from 'lodash';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import {
  getPostBySlug,
  getPostsSlugs,
  getSettings,
  getTranslationsByKeyStartsWith,
} from '@/lib/graphcms';
import { getRecommendations, parseMDX } from '@/lib/mdx';

import MembersPassword from '@/components/MembersPassword';
import Post from '@/components/Post';

import { COOKIES } from '@/constants';
import { AppContext } from '@/context/AppContext';

import { PostType, Settings, Translations } from '@/types/types';

type SinglePostPageProps = {
  preview: boolean;
  post: PostType;
  recommendations: PostType[];
  translations: Translations;
  settings: Settings;
};

export default function SinglePostPage({
  preview,
  post,
  recommendations,
  translations,
  settings,
}: SinglePostPageProps) {
  const router = useRouter();
  const [haveAccess, setHaveAccess] = useState<boolean | null>(null);
  const [cookies] = useCookies([COOKIES.MEMBERS_PASSWORD]);
  const memberPassword = settings[COOKIES.MEMBERS_PASSWORD];
  useEffect(() => {
    setHaveAccess(
      cookies?.MEMBERS_PASSWORD === memberPassword ||
        !post.tags.includes('members')
    );
  }, [cookies?.MEMBERS_PASSWORD, memberPassword, post.tags]);

  if (!haveAccess && haveAccess !== null) {
    return (
      <AppContext.Provider
        value={{
          translations,
          memberPassword,
          settings,
        }}
      >
        <MembersPassword redirectTo={router.asPath} />
      </AppContext.Provider>
    );
  }
  return (
    <AppContext.Provider
      value={{
        translations,
        memberPassword,
        settings,
        preview,
      }}
    >
      <Post post={post} recommendations={recommendations} />
    </AppContext.Provider>
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
  preview = false,
  locale,
  defaultLocale,
}) => {
  const locales = [locale || '', defaultLocale || ''];
  const post = await getPostBySlug(params?.slug as string, locales, preview);
  const mdx = await parseMDX(post.content);

  const recommendations = await getRecommendations(
    params?.slug as string,
    locales
  );
  return {
    props: {
      preview,
      post: {
        ...post,
        content: mdx,
      },
      recommendations,
      settings: await getSettings(),
      translations: await getTranslationsByKeyStartsWith(
        ['post', 'common'],
        locales
      ),
    },
  };
};
