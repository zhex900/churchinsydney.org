import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '413bgh',
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportHeight: 1000,
  },
});
