// module.exports = {
//   roots: ['<rootDir>'],
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
//   testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
//   transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
//   transform: {
//     '^.+\\.(ts|tsx)$': 'babel-jest',
//   },
//   watchPlugins: [
//     'jest-watch-typeahead/filename',
//     'jest-watch-typeahead/testname',
//   ],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//     'react-image-lightbox/style.css': '<rootDir>/test/__mocks__/styleMock.js',
//     '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
//     '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
//   },
//   testEnvironment: 'jest-environment-jsdom',
// }
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // transform: {
  //   '^.+\\.(ts|tsx)$': 'babel-jest',
  // },
  // testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/styles/(.*)$': '<rootDir>/test/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);
