/* eslint-disable @typescript-eslint/no-explicit-any */
import readingTime from 'reading-time';

import { IMAGE_SIZE } from '@/constants';

import { PostType, Translation, Translations } from '@/types/types';

function safeLocales(locales: string[]) {
  return locales.map((l) => l.replace(/-/g, '_'));
}
async function fetchAPI(
  query: string,
  {
    variables,
    preview,
  }: {
    variables: unknown;
    preview: boolean;
  } = {
    variables: {},
    preview: false,
  }
) {
  const res = await fetch(process.env.GRAPHCMS_PROJECT_API || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        preview
          ? process.env.GRAPHCMS_DEV_AUTH_TOKEN
          : process.env.GRAPHCMS_PROD_AUTH_TOKEN
      }`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    // throw new Error('Failed to fetch API');
    return [];
  }

  return json.data;
}

const postFields = `
    title
    banner {
      url(transformation: {image: {resize: {fit: crop, width: ${IMAGE_SIZE.width}, height: ${IMAGE_SIZE.height}}}})
    }
    slug
    content
    createdAt
    updatedAt
    tags
    description
    hidden
    rank
    likes
    eventDate {
      startDate
      endDate
    }
  `;

export async function getDistrict(districtName: string, preview = false) {
  const data = await fetchAPI(
    `
  query DistrictByName($districtName: DistrictNames) {
      district(where: {district: $districtName}) {
        address
        district
        email
        phone
      }
    }
  `,
    {
      preview,
      variables: {
        districtName,
      },
    }
  );
  return data.district;
}
export async function getTranslationsByKeyStartsWith(
  keyStartsWith: string,
  locales: string[]
): Promise<Translations> {
  const data = await fetchAPI(
    `
query getTranslations($keyStartsWith: String!, $locales: [Locale!]!) {
  translations(where: { key_starts_with: $keyStartsWith}, locales: $locales) {
		key
    locale
    text
  }
}
  `,
    {
      preview: false,
      variables: {
        keyStartsWith,
        locales: safeLocales(locales),
      },
    }
  );
  return data.translations?.reduce(
    (result: Translation[], item: Translation) => ({
      ...result,
      [item.key]: item,
    }),
    {}
  );
}

export async function getTranslations(
  keys: string[],
  locales: string[]
): Promise<Translations> {
  const data = await fetchAPI(
    `
query getTranslations($keys: [String!], $locales: [Locale!]!) {
  translations(where: { key_in: $keys}, locales: $locales) {
		key
    locale
    text
  }
}
  `,
    {
      preview: false,
      variables: {
        keys,
        locales: safeLocales(locales),
      },
    }
  );
  return data.translations?.reduce(
    (result: Translation[], item: Translation) => ({
      ...result,
      [item.key]: item,
    }),
    {}
  );
}

function addReadingTimeToPosts(posts: PostType[]) {
  return posts.map((p: PostType) => ({
    ...p,
    readingTime: readingTime(p.content),
  }));
}

export async function getPostsByTags(tags: string[]): Promise<PostType[]> {
  const data = await fetchAPI(
    `
query PostsByTags($tags: [Tags!]) {
  posts(where: { tags_contains_all: $tags, hidden: false}) {
    ${postFields}
  }
}
  `,
    {
      preview: false,
      variables: {
        tags,
      },
    }
  );
  if (!data.posts || !data.posts.length) {
    return [];
  }
  return addReadingTimeToPosts(data.posts);
}

export async function getPosts(locales: string[]): Promise<PostType[]> {
  const data = await fetchAPI(
    `
query getPosts($locales: [Locale!]!) {
  posts(where: {hidden: false}, locales: $locales) {
    ${postFields}
  }
}
  `,
    {
      preview: false,
      variables: {
        locales: safeLocales(locales),
      },
    }
  );
  return addReadingTimeToPosts(data.posts);
}

export async function getPostsSlugs() {
  const data = await fetchAPI(
    `
{
  posts(where: {hidden: false}) {
    slug
  }
}
  `
  );
  return data.posts;
}

export async function getPostBySlug(
  slug: string,
  locales: string[]
): Promise<PostType> {
  const data = await fetchAPI(
    `
query PostBySlug($slug: String!, $locales: [Locale!]!) {
  post(where: {slug: $slug}, locales: $locales) {
    ${postFields}
  }
}
`,
    {
      preview: false,
      variables: {
        slug,
        locales: safeLocales([...locales, 'en']),
      },
    }
  );
  return { ...data.post, readingTime: readingTime(data.post.content) };
}

export async function getSetting(key: string): Promise<string> {
  const data = await fetchAPI(
    `
query GetSettingByKey($key: String!) {
  setting(where: {key: $key}) {
    value
  }
}
`,
    {
      preview: false,
      variables: {
        key,
      },
    }
  );
  return data.setting?.value || '';
}
// export async function getAllPostsWithSlug() {
//   const data = await fetchAPI(`
//     {
//       posts {
//         slug
//       }
//     }
//   `);
//   return data.posts;
// }

// export async function getAllPostsForHome(preview) {
//   const data = await fetchAPI(
//     `
//     {
//       posts(orderBy: date_DESC, first: 20) {
//         title
//         slug
//         excerpt
//         date
//         coverImage {
//           url(transformation: {
//             image: {
//               resize: {
//                 fit:crop,
//                 width:2000,
//                 height:1000
//               }
//             }
//           })
//         }
//         author {
//           name
//           picture {
//             url(transformation: {
//               image: {
//                 resize: {
//                   width:100,
//                   height:100,
//                   fit:crop
//                 }
//               }
//             })
//           }
//         }
//       }
//     }
//   `,
//     { preview }
//   );
//   return data.posts;
// }

// export async function getPostAndMorePosts(slug, preview) {
//   const data = await fetchAPI(
//     `
//     query PostBySlug($slug: String!, $stage: Stage!) {
//       post(stage: $stage, where: {slug: $slug}) {
//         title
//         slug
//         content {
//           html
//         }
//         date
//         ogImage: coverImage {
//           url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
//         }
//         coverImage {
//           url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
//         }
//         author {
//           name
//           picture {
//             url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
//           }
//         }
//       }
//       morePosts: posts(orderBy: date_DESC, first: 2, where: {slug_not_in: [$slug]}) {
//         title
//         slug
//         excerpt
//         date
//         coverImage {
//           url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
//         }
//         author {
//           name
//           picture {
//             url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
//           }
//         }
//       }
//     }
//   `,
//     {
//       preview,
//       variables: {
//         stage: preview ? 'DRAFT' : 'PUBLISHED',
//         slug,
//       },
//     }
//   );
//   return data;
// }
