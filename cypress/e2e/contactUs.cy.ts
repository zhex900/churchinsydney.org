/* eslint-disable cypress/no-force */
describe('Contact us page', () => {
  // happy path
  it('contact us page should be able to sent email', () => {
    cy.visit('/contact-us');
    cy.intercept('POST', '/api/contact-us').as('api-contact-us');
    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const name = `Cypress Test ${randomString} `;

    cy.get('[name="name"]').type(name, { force: true });
    cy.get('[name="phone"]').type('0412345678', { force: true });
    cy.get('[name="email"]').type('cypress.test.john.doe@gmail.com', {
      force: true,
    });
    cy.get('[name="message"]').type('Hi, I am testing cypress', {
      force: true,
    });

    // click submit button
    cy.get('[type="submit"]').click();

    cy.wait('@api-contact-us').its('response.statusCode').should('eq', 308);
    cy.wait('@api-contact-us').its('response.statusCode').should('eq', 200);

    cy.get('[type="submit"]').contains('We will contact you');

    cy.waitUntil(
      () =>
        cy
          .request({
            method: 'GET',
            url: `https://api.mailgun.net/v3/churchinsydney.org/events?limit=1&event=delivered&subject=${randomString}`,
            auth: { username: 'api', password: Cypress.env('MAILGUN_API_KEY') },
          })
          .then((response) => response.body.items.length === 1),
      {
        timeout: 10000,
        interval: 500,
      }
    );
  });

  it(`/contact-us should open Contact Us page`, () => {
    cy.visit('/contact-us');
    cy.title().should('eq', 'Contact Us | churchinsydney.org');
    cy.url().should('include', '/contact-us/');
  });
});

export {};
