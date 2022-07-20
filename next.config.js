/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const axios = require('axios');
axios.defaults.baseURL = process.env.CMS_API_ENDPOINT;
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
  async rewrites() {
    const {
      data: {
        data: { access_token },
      },
    } = await axios.post(`/auth/login`, {
      email: process.env.CMS_API_USERNAME,
      password: process.env.CMS_API_PASSWORD,
    });

    const {
      data: { data: redirect },
    } = await axios.get('/items/redirect?limit=-1', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const {
      data: { data: posts },
    } = await axios.get(
      '/items/posts?limit=-1&filter={ "status": { "_eq": "published" }}',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

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
