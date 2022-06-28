import { TextEncoder } from 'util';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'intersection-observer';
import 'whatwg-fetch';

import { server } from './test/__mocks__/network/server';

process.env.CMS_API_ENDPOINT = 'https://backend';
process.env.CMS_API_USERNAME = 'user';
process.env.CMS_API_PASSWORD = 'password';

global.TextEncoder = TextEncoder;

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
