describe('Our member page', () => {
  it(`Announcements should ask for members login`, () => {
    cy.intercept('GET', '/api/has-new-deploy/').as('api-has-new-deploy');
    cy.clearCookies();
    cy.visit('/announcements');

    cy.title().should('eq', 'Announcements | churchinsydney.org');
    cy.contains('General Announcement').click();
    cy.wait('@api-has-new-deploy');

    cy.title().should('eq', "Member's Password | churchinsydney.org");
    cy.url().should('include', '/announcement/');
    cy.get('input').type(Cypress.env('MEMBERS_PASSWORD'));
    cy.contains('Submit').click();

    cy.title().should('eq', 'General Announcement | churchinsydney.org');
    cy.contains('General Announcement').should('be.visible');
    cy.contains('Last updated').should('be.visible');
    cy.getCookie('members-password').should('exist');

    cy.visit('/announcement');
    cy.title().should('eq', 'General Announcement | churchinsydney.org');
    cy.contains('General Announcement').should('be.visible');
    cy.contains('Last updated').should('be.visible');
  });
});

export {};
