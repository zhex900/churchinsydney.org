import readingTime from 'reading-time';

import { IMAGE_SIZE } from '@/constants';

import { PostType } from '@/types/post';
async function fetchAPI(
  query: string,
  {
    variables,
    preview,
  }: {
    variables: any;
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

export async function getPostsByTags(tags: string[]): Promise<PostType[]> {
  const data = await fetchAPI(
    `
query PostsByTags($tags: [Tags!]) {
  posts(where: { tags_contains_all: $tags}) {
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
  return data.posts.map((p: PostType) => ({
    ...p,
    readingTime: readingTime(p.content),
  }));
}

export async function getPosts(): Promise<PostType[]> {
  const data = await fetchAPI(
    `
{
  posts {
    ${postFields}
  }
}
  `
  );
  return data.posts.map((p: PostType) => ({
    ...p,
    readingTime: readingTime(p.content),
  }));
}

export async function getPostsSlugs() {
  const data = await fetchAPI(
    `
{
  posts {
    slug
  }
}
  `
  );
  return data.posts;
}

export async function getPostBySlug(slug: string): Promise<PostType> {
  const data = await fetchAPI(
    `
query PostBySlug($slug: String!) {
  post(where: {slug: $slug}) {
    ${postFields}
  }
}
`,
    {
      preview: false,
      variables: {
        slug,
      },
    }
  );
  return { ...data.post, readingTime: readingTime(data.post.content) };
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
