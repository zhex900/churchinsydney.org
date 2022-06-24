import { getTags, sortByDate } from '@/lib/utils';

import Posts, { PostsPropsType } from '@/components/Posts';

import {
  getLinks,
  getPostsByTags,
  getSettings,
  getTranslationsByNamespace,
} from '@/cms';
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
        settings,
        links,
      }}
    >
      <Posts
        {...{
          posts,
          tags,
          title: translations['common-events'],
          filter: 'event',
        }}
      />
    </AppContext.Provider>
  );
}

export async function getStaticProps({
  locale,
}: {
  locale: string;
  defaultLocale: string;
}) {
  const posts = sortByDate(await getPostsByTags(['Event'], locale));
  const tags = getTags(posts);

  return {
    props: {
      posts,
      tags,
      settings: await getSettings(),
      translations: (await getTranslationsByNamespace(
        ['common', 'post'],
        locale
      )) as Translations,
      links: await getLinks(locale),
    },
  };
}
