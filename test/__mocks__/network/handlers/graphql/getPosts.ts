import { graphql } from 'msw';

export const getPosts = graphql.query('GetPosts', (_, res, ctx) => {
  return res(
    ctx.data({
      posts: [
        {
          slug: 'slug-post',
          tags: ['Event'],
          banner: {
            id: 'image-id',
          },
          translations: [
            {
              title: 'Title',
              summary: null,
              body: 'Body',
            },
          ],
          dateCreated: '2020-01-01',
          dateUpdated: '2020-01-01',
          start: null,
          end: null,
          rank: 100,
        },
      ],
    })
  );
});
