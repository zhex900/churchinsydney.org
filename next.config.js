/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA(
  nextTranslate({
    // reactStrictMode: true,
    images: {
      domains: ['media.graphcms.com', 'media.graphassets.com'],
    },
    pwa: {
      dest: 'public',
      runtimeCaching,
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === 'development',
    },
  })
);
