const posts = {
  pageProps: {
    posts: [
      {
        slug: 'announcement',
        tags: ['Members', 'Announcement', 'Featured'],
        banner:
          'https://hyjo51vx.directus.app/assets/f867e5e2-3256-4cd9-87ab-7c855ac4e9cb',
        dateCreated: '2022-06-23T21:04:58.985Z',
        dateUpdated: '2021-07-19T22:36:10.972Z',
        start: null,
        end: null,
        rank: 100,
        title: 'Cypress General Announcement',
        summary: null,
        body: '',
      },
    ],
    tags: ['Featured', 'Announcement', 'Members', 'Event'],
    settings: {},
    translations: {
      'common-announcements': 'Announcements',
      'post-last-updated': 'Last updated',
      'post-ago': 'ago',
    },
    links: [],
  },
};

describe('Date', () => {
  it('Post last updated date should render correctly', () => {
    cy.intercept('GET', '**/announcements.json', {
      statusCode: 201,
      body: posts,
    }).as('api-announcements');

    cy.clock(Date.UTC(2022, 3, 30), ['Date']);

    cy.visit('/');

    cy.get('[href="/announcements/"]').click();
    cy.title().should('eq', 'Announcements | churchinsydney.org');
    cy.contains('Cypress General Announcement').should('exist');
    cy.contains('Last updated: 9 months ago').should('exist');
  });
});

export {};
