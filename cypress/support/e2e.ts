// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import installLogsCollector from 'cypress-terminal-report/src/installLogsCollector';
import './commands';

installLogsCollector();
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ga: any;
  }
}

Cypress.on('window:before:load', (win: Window) => {
  // because this is called before any scripts
  // have loaded - the ga function is undefined
  // so we need to create it.
  win.ga = cy.stub().as('ga');
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
export {};
