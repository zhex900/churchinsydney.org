describe('Contact us page', () => {
  // happy path
  it('contact us page should be able to sent email', () => {
    cy.visit('/contact-us');
    cy.intercept('POST', '/api/contact-us').as('api-contact-us');
    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const name = `Cypress Test ${randomString} `;
    cy.get('[name="name"]').type(name);
    cy.get('[name="phone"]').type('0412345678');
    cy.get('[name="email"]').type('cypress.test.john.doe@gmail.com');
    cy.get('[name="message"]').type('Hi, I am testing cypress');

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
        timeout: 6000,
        interval: 500,
      }
    );
  });

  //error handling
});

export {};
