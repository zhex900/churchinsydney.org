import { gql } from 'graphql-request';

import { request } from '@/lib/graphql';

import { postFields, PostsGraphQLResponse, transformPosts } from './utils';

import { PostType } from '@/types/types';

export async function getPostBySlug(
  slug: string,
  locale: string
): Promise<PostType | undefined> {
  const { posts } = (await request({
    document: gql`
    query GetPostBySlug($slug: String!,$locale: String!) {
      posts(
        filter: {slug:{_eq: $slug}, status: {_eq: "published"}}
      ) {
          ${postFields}
        }
      }
    `,
    variables: {
      locale,
      slug,
    },
  })) as { posts: PostsGraphQLResponse };

  return transformPosts(posts).pop();
}
