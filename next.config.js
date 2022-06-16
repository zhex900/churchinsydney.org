/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  images: {
    domains: ['media.churchinsydney.org'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
  i18n: {
    locales: ['en', 'zh-CN'], // Array with the languages that you want to use
    defaultLocale: 'en', // Default language of your website
    localeDetection: true,
  },
  trailingSlash: true,
});
