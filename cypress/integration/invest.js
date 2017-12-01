describe('working', () => {
  it('should work', () => {
    cy.visit('localhost:3000');

    cy
      .get('#initial-investment')
      .clear()
      .type(1000);

    cy
      .get('#years')
      .clear()
      .type(6);

    cy
      .get('#annual-yield')
      .clear()
      .type(6);

    cy
      .get('#y-maturity')
      .clear()
      .type(2);

    cy
      .get('#y-yield')
      .clear()
      .type(11);
    cy
      .get('#y-yield-after')
      .clear()
      .type(10);

    cy
      .get('#z-maturity')
      .clear()
      .type(3);
    cy
      .get('#z-yield')
      .clear()
      .type(20);

    cy
      .get('#w-maturity')
      .clear()
      .type(4);
    cy
      .get('#w-yield')
      .clear()
      .type(25);

    cy.get('#solve').click();
  });
});
