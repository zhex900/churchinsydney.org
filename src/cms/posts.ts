import { GRAPHQL_QUERY_LIMIT } from '@/constants';

export * from './settings';

import {
  getLocaleValue,
  GraphQlLocalFieldType,
  localeField,
  transformLocaleFields,
} from './locale';
import { fetchTagIdsByName } from './tags';
import { fetchAPI } from './webinyClient';

import { PostType } from '@/types/types';

function postFields(locale: string) {
  return `
    data {
      title {
        ${localeField(locale)}
      }
      banner
      slug
      content {
        ${localeField(locale, true)}
      }
      savedOn
      createdOn
      tags {
        name {
          ${localeField(locale)}
        }
      }
      description {
        ${localeField(locale)}
      }
      hidden
      rank
      likes
      eventDate {
        start
        end
      }
    }
  `;
}

type GraphQlPostType = {
  title: GraphQlLocalFieldType;
  description: GraphQlLocalFieldType;
  content: GraphQlLocalFieldType;
  tags: { name: GraphQlLocalFieldType }[];
} & Omit<PostType, 'title' | 'description' | 'content' | 'tags'>;

function replaceMediaUrlDomain(url: string) {
  const _url = new URL(url);
  if (process.env.NEXT_PUBLIC_WEBINY_MEDIA_URL) {
    _url.hostname = new URL(process.env.NEXT_PUBLIC_WEBINY_MEDIA_URL).hostname;
  }
  return _url.href;
}
function transformPost(post: GraphQlPostType): PostType {
  const tags = post.tags as unknown as { name: GraphQlLocalFieldType }[];
  return {
    ...transformLocaleFields(['title', 'description', 'content'])(post),
    banner: replaceMediaUrlDomain(post.banner),
    tags: tags?.map((tag) => getLocaleValue(tag.name)),
  } as PostType;
}

function transformPosts(posts: GraphQlPostType[]): PostType[] {
  return posts.map(transformPost);
}

export async function getPostsByTags(tags: string[], locale: string) {
  const tagIds = await fetchTagIdsByName(tags);
  const {
    listPosts: { data },
  } = await fetchAPI(
    `
query($tagIds: [String!]!) {
  listPosts(limit: ${GRAPHQL_QUERY_LIMIT}, where : {tags : {id_in :$tagIds}}) {
    ${postFields(locale)}
  }
}    
  `,
    {
      preview: false,
      variables: { tagIds },
    }
  );

  return transformPosts(data);
}

export async function getPostBySlug(
  slug: string,
  locale: string,
  preview: boolean
): Promise<PostType> {
  const {
    getPost: { data: post },
  } = await fetchAPI(
    `
query($slug: String!) {
  getPost(where: {slug: $slug}) {
      ${postFields(locale)}
  }
}
`,
    {
      preview,
      variables: {
        slug,
      },
    }
  );
  return transformPost(post);
}

export async function getPosts(locale: string): Promise<PostType[]> {
  const {
    listPosts: { data },
  } = await fetchAPI(
    `
{
  listPosts(limit: ${GRAPHQL_QUERY_LIMIT}) {
     ${postFields(locale)}
  }
}
  `,
    {
      preview: false,
      variables: {},
    }
  );
  return transformPosts(data as GraphQlPostType[]);
}

export async function getPostsSlugs() {
  const {
    listPosts: { data },
  } = await fetchAPI(
    `
{
  listPosts(limit: ${GRAPHQL_QUERY_LIMIT}) {
    data {
     slug
    }
  }
}
  `,
    {
      preview: false,
      variables: {},
    }
  );
  return data;
}

export async function getPreviewPostBySlug(slug: string): Promise<string> {
  const {
    getPost: { data },
  } = await fetchAPI(
    `
query($slug: String!) {
  getPost(where: {slug: $slug}) {
    data {
      slug
    }
  }
}
`,
    {
      preview: true,
      variables: {
        slug,
      },
    }
  );
  return data.slug;
}
