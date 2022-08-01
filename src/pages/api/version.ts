import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    vercelUrl: process.env.VERCEL_URL,
    buildId: process.env.NEXT_BUILD_ID,
    commit: process.env.DEPLOY_COMMIT,
    ref: process.env.DEPLOY_REF,
    branch: process.env.DEPLOY_BRANCH,
    deploySource: process.env.DEPLOY_SOURCE,
    environment: process.env.VERCEL_ENV,
  });
}
