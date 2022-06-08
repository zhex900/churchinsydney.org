import fs from 'fs';
export async function getRssXml() {
  const url = 'https://churchinsydney.org';

  return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:blogChannel="${blogUrl}">
      <channel>
        <title>Church in Sydney</title>
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
