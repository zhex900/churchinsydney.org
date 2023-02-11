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
    const testEmail = 'zhex900+test@gmail.com';
    cy.get('[name="name"]').type(name, { force: true });
    cy.get('[name="phone"]').type('0412345678', { force: true });
    cy.get('[name="email"]').type(testEmail, {
      force: true,
    });
    cy.get('[name="message"]').type('Hi, I am testing cypress', {
      force: true,
    });

    // click submit button
    cy.get('[type="submit"]').click();

    cy.wait('@api-contact-us').its('response.statusCode').should('eq', 308);
    cy.wait('@api-contact-us').then((interception) => {
      expect(interception.response).to.exist;
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        cy.get('[type="submit"]').contains('We will contact you');
        expect(interception.response.body).to.have.property('messageId');
        const { messageId } = interception.response.body;

        cy.waitUntil(
          () =>
            cy
              .request({
                method: 'GET',
                url: `https://api.sendinblue.com/v3/smtp/emails?messageId=${encodeURIComponent(
                  messageId
                )}`,
                headers: {
                  'api-key': Cypress.env('MAIL_API_KEY'),
                },
              })
              .then((response) => response.body.count === 1),
          {
            timeout: 10000,
            interval: 500,
          }
        );
      }
    });
  });

  it(`/contact-us should open Contact Us page`, () => {
    cy.visit('/contact-us');
    cy.title().should('eq', 'Contact Us | churchinsydney.org');
    cy.url().should('include', '/contact-us/');
  });
});

export {};
