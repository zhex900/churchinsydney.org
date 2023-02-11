import { rest } from 'msw';

export const hasNewDeploy = rest.get('/api/has-new-deploy', (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      username: 'admin',
      version: 1,
    })
  );
});
