import { parseTranslation } from '../locale';

import { PostType } from '@/types/types';

export const postFields = `
    slug
    tags
    banner {
      id
    }
    translations(filter: {languages_code: {code: {_eq: $locale}}}) {
      title
      summary
      body
    }
    dateCreated: date_created
    dateUpdated: date_updated
    start
    end
    rank: sort
  `;

type PostTranslation = {
  title: string;
  summary: string | null;
  body: string;
};

export type PostGraphQLResponse = {
  slug: string;
  tags: [string];
  banner: {
    id: string;
  };
  translations: PostTranslation[];
  dateCreated: string;
  dateUpdated: string | null;
  start: string | null;
  end: string | null;
  rank: number | null;
};

export type PostsGraphQLResponse = PostGraphQLResponse[];

type TransformedPostType = Omit<PostGraphQLResponse, 'translations'> &
  PostTranslation;

export const transformPost = (post: TransformedPostType) => {
  return {
    ...post,
    banner: `${process.env.CMS_API_ENDPOINT}/assets/${post.banner.id}`,
  };
};

export const transformPosts = (posts: PostsGraphQLResponse): PostType[] => {
  return parseTranslation(posts).map(transformPost);
};
