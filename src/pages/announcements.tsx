import {
  getLinks,
  getPosts,
  getSettings,
  getTranslationsByKeyStartsWith,
} from '@/lib/graphcms';
import { getTags, sortByDate } from '@/lib/mdx-client';

import Posts, { PostsPropsType } from '@/components/Posts';

import { COOKIES } from '@/constants';
import { AppContext } from '@/context/AppContext';

import { Links, Settings, Translations } from '@/types/types';

export default function AnnouncementsPage({
  posts,
  tags,
  translations,
  links,
  settings,
}: {
  posts: PostsPropsType['posts'];
  tags: PostsPropsType['tags'];
  translations: Translations;
  links: Links;
  settings: Settings;
}) {
  return (
    <AppContext.Provider
      value={{
        translations,
        settings,
        memberPassword: settings[COOKIES.MEMBERS_PASSWORD],
        links,
      }}
    >
      <Posts
        {...{
          posts,
          tags,
          title: translations['common-announcements'].text,
        }}
      />
    </AppContext.Provider>
  );
}

export async function getStaticProps({
  locale,
  defaultLocale,
}: {
  locale: string;
  defaultLocale: string;
}) {
  const posts = sortByDate(await getPosts([locale, defaultLocale]));
  const tags = getTags(posts);

  return {
    props: {
      posts,
      tags,
      settings: await getSettings(),
      translations: await getTranslationsByKeyStartsWith(
        ['common', 'post'],
        [locale, defaultLocale]
      ),
      links: await getLinks([locale, defaultLocale]),
    },
  };
}
