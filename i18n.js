// module.exports = {
//   locales: ['en', 'zh-CN'], // Array with the languages that you want to use
//   defaultLocale: 'en', // Default language of your website
//   pages: {
//     '*': ['common'], // Namespaces that you want to import per page (we stick to one namespace for all the application in this tutorial)
//   },
// };

// module.exports = {
//   locales: ['en', 'zh-CN'],
//   defaultLocale: 'en',
//   pages: {
//     '*': ['common'],
//   },
//   interpolation: {
//     prefix: '${',
//     suffix: '}',
//   },
//   // loadLocaleFrom: (locale, namespace) => {
//   //   console.log(locale, namespace);
//   //   import(`./src/translations/${namespace}_${locale}`).then((m) => m.default);
//   // },
// };

module.exports = {
  locales: ['en', 'zh-CN'], // Array with the languages that you want to use
  defaultLocale: 'en', // Default language of your website
  pages: {
    '*': ['common'], // Namespaces that you want to import per page (we stick to one namespace for all the application in this tutorial)
  },
};
