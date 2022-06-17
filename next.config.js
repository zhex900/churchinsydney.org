/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['media.churchinsydney.org'],
  },
  i18n: {
    locales: ['en', 'zh-CN'], // Array with the languages that you want to use
    defaultLocale: 'en', // Default language of your website
    localeDetection: true,
  },
  trailingSlash: true,
};
