import type { NextApiRequest, NextApiResponse } from 'next';

import { getPreviewPostBySlug } from '@/cms';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Fetch the headless CMS to check if the provided `slug` exists
  const slug = await getPreviewPostBySlug(req.query.slug.toString());

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!slug) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/post/${slug}` });
  res.end();
}
