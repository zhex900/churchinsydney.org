/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['hyjo51vx.directus.app'],
  },
  i18n: {
    locales: ['en', 'zh-CN'], // Array with the languages that you want to use
    defaultLocale: 'en', // Default language of your website
    localeDetection: true,
  },
  trailingSlash: true,
};
