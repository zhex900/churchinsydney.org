import { defineConfig } from 'cypress';
import installLogsPrinter from 'cypress-terminal-report/src/installLogsPrinter';

export default defineConfig({
  projectId: '413bgh',
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportHeight: 1000,
    setupNodeEvents(on, _) {
      installLogsPrinter(on);
    },
  },
  blockHosts: ['www.google-analytics.com', 'ssl.google-analytics.com'],
});
