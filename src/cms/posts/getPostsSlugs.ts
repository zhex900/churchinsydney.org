import { gql } from 'graphql-request';

import { request } from '@/lib/graphql';

export async function getPostsSlugs() {
  const { posts } = (await request({
    document: gql`
      query GetPostsSlugs {
        posts {
          slug
        }
      }
    `,
  })) as {
    posts: {
      [key: string]: {
        slug: string;
      };
    };
  };
  return Object.values(posts);
}
