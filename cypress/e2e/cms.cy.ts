describe('CMS', () => {
  it('cms subdomain should redirect and login into cms should work', () => {
    cy.visit('https://cms.churchinsydney.org');

    cy.url().then((url) => {
      cy.request('POST', `${url.replace('/admin', '')}auth/login`, {
        email: Cypress.env('CMS_CYPRESS_USERNAME'),
        mode: 'cookie',
        password: Cypress.env('CMS_CYPRESS_PASSWORD'),
      });
      cy.reload();
      cy.contains('Cypress is currently authenticated.').should('be.visible');
    });
  });
});

export {};
