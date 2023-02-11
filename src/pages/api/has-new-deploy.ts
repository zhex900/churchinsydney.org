import { APIRoute } from 'next-deploy-notifications/api';

export default APIRoute.configure({
  version: () =>
    process.env?.NEXT_BUILD_ID || process.env?.VERCEL_GIT_COMMIT_SHA || '',
});
