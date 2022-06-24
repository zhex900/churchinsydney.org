import { gql } from 'graphql-request';

import { request } from '@/lib/graphql';

import { postFields, PostsGraphQLResponse, transformPosts } from './utils';

import { PostType } from '@/types/types';

export async function getPosts(locale: string): Promise<PostType[]> {
  const { posts } = (await request({
    document: gql`
    query ($locale: String!) {
      posts(
        filter: {status: {_eq: "published"}}
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
