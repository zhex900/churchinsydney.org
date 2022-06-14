import {
  getLinks,
  getPostsByTags,
  getSettings,
  getTranslationsByKeyStartsWith,
} from '@/lib/graphcms';
import { getTags, sortByDate } from '@/lib/mdx-client';

import Posts, { PostsPropsType } from '@/components/Posts';

import { COOKIES } from '@/constants';
import { AppContext } from '@/context/AppContext';

import { Links, Settings, Translations } from '@/types/types';

export default function EventsPage({
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
        memberPassword: settings[COOKIES.MEMBERS_PASSWORD],
        settings,
        links,
      }}
    >
      <Posts
        {...{
          posts,
          tags,
          title: translations['common-events'].text,
          filter: 'event',
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
  const posts = sortByDate(await getPostsByTags(['event']));
  const tags = getTags(posts);

  return {
    props: {
      posts,
      tags,
      settings: await getSettings(),
      translations: (await getTranslationsByKeyStartsWith(
        ['common', 'post'],
        [locale, defaultLocale]
      )) as Translations,
      links: await getLinks([locale, defaultLocale]),
    },
  };
}
