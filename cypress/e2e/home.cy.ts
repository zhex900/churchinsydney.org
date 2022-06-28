const homePageContent = {
  ['home-verse']:
    'God desires all men to be saved and come to the full knowledge of the truth.1 Tim. 2:4',
  ['home-quote']:
    'God’s heart and will in His New Testament economy, God’s good pleasure, the counsel of His will, and His purpose are to have a Body for the enlargement and expression of Christ, the embodiment of the processed Triune God (Eph. 1:9-11, 22-23; 3:9-11).',
  ['home-introduction-title']: 'Wonderful Church Life!',
};

describe('Home page', () => {
  it('Home page content should exist', () => {
    cy.visit('/');

    cy.title().should('eq', 'Church in Sydney');

    cy.get('[data-testid="home-verse"]').should(
      'contain.text',
      homePageContent['home-verse']
    );

    // eslint-disable-next-line cypress/no-force
    cy.contains('Welcome!').should('exist').click({ force: true });

    cy.get('[data-testid="home-introduction-title"]').should(
      'contain.text',
      homePageContent['home-introduction-title']
    );

    cy.get('[data-testid="home-quote"]').should(
      'contain.text',
      homePageContent['home-quote']
    );
  });
});

export {};
