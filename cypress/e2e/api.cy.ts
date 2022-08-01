describe('API', () => {
  it('/api/version', () => {
    cy.intercept('GET', '/api/version').as('api-version');

    cy.request('/api/version').then((response) => {
      expect(response.status).to.eq(200);

      [
        'ref',
        'branch',
        'buildId',
        'deploySource',
        'commit',
        'environment',
      ].forEach((key) => {
        expect(response.body).to.have.ownProperty(key);
        expect(response.body[key]).not.empty;
      });
    });
  });
});

export {};
