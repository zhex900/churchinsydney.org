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

export type PostGraphQLResponse = {
  slug: string;
  tags: {
    [key: string]: string;
  };
  banner: {
    id: string;
  };
  translations: {
    0: {
      title: string;
      summary: string | null;
      body: string;
    };
  };
  dateCreated: string;
  dateUpdated: string | null;
  start: string | null;
  end: string | null;
  rank: number | null;
};

export type PostsGraphQLResponse = {
  [key: string]: PostGraphQLResponse;
};

export const transformPost = (post: PostGraphQLResponse) => {
  return {
    ...post,
    banner: `${process.env.CMS_API_ENDPOINT}/assets/${post.banner.id}`,
    tags: Object.values(post.tags),
  };
};

export const transformPosts = (posts: PostsGraphQLResponse): PostType[] => {
  // @TODO: fix return type
  return parseTranslation(posts).map(transformPost) as unknown as PostType[];
};
