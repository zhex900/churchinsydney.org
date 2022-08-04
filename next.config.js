/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const { getPosts, getRedirect } = require('./src/cms/api');

const CMS_URL = new URL(process.env.CMS_API_ENDPOINT);

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: [CMS_URL.hostname],
  },
  i18n: {
    locales: ['en', 'zh-CN'], // Array with the languages that you want to use
    defaultLocale: 'en', // Default language of your website
    localeDetection: true,
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/cms',
        destination: process.env.CMS_API_ENDPOINT,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const posts = await getPosts();
    const redirect = await getRedirect();
    return [
      ...posts.map(({ slug }) => ({
        source: `/${slug}`,
        destination: `/post/${slug}`,
      })),
      ...redirect.map(({ source, destination }) => ({
        source: `/${source}`,
        destination,
      })),
    ];
  },
};
