import { gql } from 'graphql-request';

import { request } from '@/lib/graphql';

import { postFields, PostsGraphQLResponse, transformPosts } from './utils';

import { PostType } from '@/types/types';

export async function getPostsByTags(
  tags: string[],
  locale: string
): Promise<PostType[]> {
  const { posts } = (await request({
    document: gql`
      query GetPostsByTags($locale: String!) {
        posts(
          filter: {
            _or: [
              ${tags
                .map((tag) => `{ tags: { _contains: "${tag}" } }`)
                .join('\n')}
            ]
            status: { _eq: "published" }
          }
        ) {
          ${postFields}
        }
      }
    `,
    variables: {
      locale,
    },
  })) as { posts: PostsGraphQLResponse };

  return transformPosts(posts);
}
