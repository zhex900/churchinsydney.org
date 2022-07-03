import { TextEncoder } from 'util';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import 'intersection-observer';
import 'whatwg-fetch';

import { server } from './__mocks__/network/server';

process.env.CMS_API_ENDPOINT = 'https://backend';
process.env.CMS_API_USERNAME = 'user';
process.env.CMS_API_PASSWORD = 'password';

global.TextEncoder = TextEncoder;

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
//
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class ResizeObserver {
  observe() {
    return vi.fn();
  }
  unobserve() {
    return vi.fn();
  }
  disconnect() {
    return vi.fn();
  }
}
window.ResizeObserver = ResizeObserver;

vi.mock('next/router', () => ({
  __esModule: true,
  useRouter: vi.fn().mockImplementation(() => ({ route: '/' })),
}));
