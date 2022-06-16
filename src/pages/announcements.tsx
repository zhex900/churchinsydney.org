import { getTags, sortByDate } from '@/lib/utils';

import Posts, { PostsPropsType } from '@/components/Posts';

import {
  getLinks,
  getPosts,
  getSettings,
  getTranslationsByNamespace,
} from '@/cms';
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
        links,
      }}
    >
      <Posts
        {...{
          posts,
          tags,
          title: translations['common-announcements'],
        }}
      />
    </AppContext.Provider>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  // const locales = [locale, defaultLocale] as NextLocales[];
  const posts = sortByDate(await getPosts(locale));
  const tags = getTags(posts);

  return {
    props: {
      posts,
      tags,
      settings: await getSettings(),
      translations: await getTranslationsByNamespace(
        ['common', 'post'],
        locale
      ),
      links: await getLinks(locale),
    },
  };
}
