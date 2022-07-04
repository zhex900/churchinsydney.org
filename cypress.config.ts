import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '413bgh',
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportHeight: 1000,
  },
  blockHosts: ['www.google-analytics.com', 'ssl.google-analytics.com'],
});
