/* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable @typescript-eslint/no-var-requires */
// /**
//  * @type {import('next').NextConfig}
//  */

// const nextTranslate = require('next-translate');

// module.exports = nextTranslate({
//   reactStrictMode: true,
//   eslint: {
//     dirs: ['src'],
//   },
//   images: {
//     domains: [
//       'res.cloudinary.com',

//       // Spotify Album
//       'i.scdn.co',
//     ],
//   },
//   webpack: (config, { dev, isServer }) => {
//     // Replace React with Preact only in client production build
//     if (!dev && !isServer) {
//       Object.assign(config.resolve.alias, {
//         react: 'preact/compat',
//         'react-dom/test-utils': 'preact/test-utils',
//         'react-dom': 'preact/compat',
//       });
//     }

//     return config;
//   },
// });

/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');

// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextTranslate(nextConfig);
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA(
  nextTranslate({
    reactStrictMode: true,
    pwa: {
      dest: 'public',
      runtimeCaching,
    },
  })
);
