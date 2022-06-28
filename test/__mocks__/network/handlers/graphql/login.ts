import { graphql } from 'msw';

export const login = graphql.mutation('Login', (_, res, ctx) => {
  return res(
    ctx.data({
      auth_login: 'TOKEN',
    })
  );
});
