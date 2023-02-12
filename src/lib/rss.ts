import fs from 'fs';

import { SITE_TITLE } from '@/constants';
export async function getRssXml() {
  const url = process.env.SITE_URL;

  return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:blogChannel="${url}">
      <channel>
        <title>${SITE_TITLE}y</title>
        <link>${url}</link>
        <description>Welcome 👋 !</description>
        <language>en</language>
        <ttl>40</ttl>
      </channel>
    </rss>
  `.trim();
}

export async function generateRss() {
  const xml = await getRssXml();
  fs.writeFileSync('public/rss.xml', xml);
}
