describe('CMS', () => {
  it('cms subdomain should redirect and login into cms should work', () => {
    cy.visit('https://dev.churchinsydney.org/cms');
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
      cy.wait('@page', { timeout: 10000 });
      cy.get('.name').should('contain.text', 'churchinsydney.org');
      cy.contains('No Collections').should('be.visible');
      cy.request('POST', `${url.replace('/admin', '')}auth/logout`);
    });
  });

  it('extend cms for another 7 days', () => {
    cy.visit('https://directus.cloud/login/email');

    cy.get('[type="email"]').type(Cypress.env('CMS_ADMIN_USERNAME'));
    cy.get('[type="password"]').type(Cypress.env('CMS_ADMIN_PASSWORD'));
    cy.contains('Login to Dashboard').click();
    cy.contains('Team Projects').should('be.visible');
    cy.getCookie('auth').then((cookie) => {
      if (!cookie) {
        throw new Error('No cookie found');
      }

      cy.request(
        'POST',
        'https://v2.api.directus.cloud/teams/97e3df37-9def-45f8-871c-838d1cf5d228/projects/b97dd891-7539-4015-8967-9ad45d3dfcde/extend',
        {
          headers: {
            Cookie: `auth=${cookie.value};`,
            Referer: 'https://directus.cloud',
            Origin: 'https://directus.cloud',
          },
        }
      );
    });
  });
});

export {};
