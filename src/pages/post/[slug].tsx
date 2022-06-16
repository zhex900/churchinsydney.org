import { flatten } from 'lodash';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import getRecommendations from '@/lib/getRecommendations';
import useProtectPage from '@/hooks/useProtectPage';

import MembersPassword from '@/components/MembersPassword';
import Post from '@/components/Post';

import { getPostBySlug, getTranslationsByNamespace } from '@/cms';
import { getPostsSlugs, getSettings } from '@/cms';
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
  const { haveAccess } = useProtectPage(post.tags, settings);
  if (!haveAccess && haveAccess !== null) {
    return (
      <AppContext.Provider
        value={{
          translations,
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
}) => {
  const post = await getPostBySlug(
    params?.slug as string,
    locale || 'en',
    preview
  );

  return {
    props: {
      preview,
      post,
      recommendations: await getRecommendations(
        params?.slug as string,
        locale || 'en'
      ),
      settings: await getSettings(),
      translations: await getTranslationsByNamespace(
        ['post', 'common'],
        locale || 'en'
      ),
    },
  };
};
