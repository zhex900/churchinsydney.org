type ViewportPreset = 'macbook-13' | 'iphone-x';

describe('Our Belief page', () => {
  ['macbook-13', 'iphone-x'].forEach((portView) => {
    it(`[${portView}] Our belief page should open after click on the our-belief menu`, () => {
      cy.viewport(portView as ViewportPreset);
      cy.visit('/');
      cy.title().should('eq', 'Church in Sydney');
      cy.get('[href="/our-belief/"]').click();
      cy.title().should('eq', 'Our Belief | churchinsydney.org');
      cy.url().should('include', '/our-belief/');
    });
  });

  it(`/our-belief should open Our Belief page`, () => {
    cy.visit('/our-belief');
    cy.title().should('eq', 'Our Belief | churchinsydney.org');
    cy.url().should('include', '/our-belief/');
  });
});

export {};
