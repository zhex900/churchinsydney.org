import { graphql } from 'msw';

export const getPostsSlugs = graphql.query('GetPostsSlugs', (req, res, ctx) => {
  return res(
    ctx.data({
      posts: [
        {
          slug: 'conference',
        },
        {
          slug: 'general-announcement',
        },
      ],
    })
  );
});
