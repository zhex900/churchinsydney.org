const events = {
  pageProps: {
    posts: [...Array(5).keys()].map((i) => ({
      slug: `event-${i}`,
      tags: ['Event'],
      banner:
        'https://hyjo51vx.directus.app/assets/1d72ad69-904a-4536-9f50-6c142d00f0a3',
      dateCreated: '2022-06-23T21:01:22.006Z',
      dateUpdated: '2022-07-24T01:12:53.702Z',
      start: '2022-07-01',
      end: '2022-07-04',
      rank: 0,
      title: `Event ${i}`,
      summary: null,
      body: '',
    })),
    tags: ['Event'],
    settings: {},
    translations: {},
    links: [],
  },
};

describe('Event page', () => {
  it(`Event page should open after click on the event menu`, () => {
    cy.visit('/');
    cy.intercept('GET', '**/events.json').as('api-events');
    cy.title().should('eq', 'Church in Sydney');
    cy.get('nav').within(() => {
      cy.get('[href="/events/"]').click();
    });
    cy.wait('@api-events');
    cy.title().should('eq', 'Events | churchinsydney.org');
    cy.url().should('include', '/events/');
  });

  it(`/events should open event page`, () => {
    cy.visit('/events');
    cy.title().should('eq', 'Events | churchinsydney.org');
    cy.url().should('include', '/events/');
  });

  it(`Event page should list the events`, () => {
    cy.visit('/');
    cy.intercept('GET', '**/events.json', events).as('api-events');

    cy.get('nav').within(() => {
      cy.get('[href="/events/"]').click();
    });
    cy.wait('@api-events');
    cy.get('[aria-label="post-cards"]>li')
      .should('exist')
      .should('have.length', events.pageProps.posts.length)
      .each(($el, i) => {
        cy.wrap($el).should('contain', `Event ${i}`);
      });
  });
});

export {};
