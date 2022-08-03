describe('CMS', () => {
  it('cms subdomain should redirect and login into cms should work', () => {
    cy.visit('https://cms.churchinsydney.org');
    cy.intercept('**/settings').as('settings');
    cy.intercept('**/auth').as('auth');
    cy.intercept('**/users/me/track/page').as('page');
    cy.url().then((url) => {
      cy.request('POST', `${url.replace('/admin', '')}auth/login`, {
        email: Cypress.env('CMS_CYPRESS_USERNAME'),
        mode: 'cookie',
        password: Cypress.env('CMS_CYPRESS_PASSWORD'),
      });
      cy.reload();
      cy.contains('Cypress is currently authenticated.').should('be.visible');
      cy.contains('Continue').click();
      cy.wait('@settings');
      cy.wait('@auth');
      cy.wait('@page');
      cy.get('.name').should('contain.text', 'churchinsydney.org');
      cy.contains('No Collections').should('be.visible');
      cy.request('POST', `${url.replace('/admin', '')}auth/logout`);
    });
  });
});

export {};
