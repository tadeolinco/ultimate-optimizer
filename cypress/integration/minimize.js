describe('working', () => {
  it('should work', () => {
    cy.visit('localhost:3000');
    cy.get('button[name="add-z"]').click();
    cy
      .get('.z0 > input')
      .clear()
      .type(150);
    cy
      .get('.z1 > input')
      .clear()
      .type(175);

    cy
      .get('.c00 > input')
      .clear()
      .type(7);

    cy
      .get('.c01 > input')
      .clear()
      .type(11);

    cy
      .get('.c0 > input')
      .clear()
      .type(77);

    cy.get('button[name="add-c"]').click();
    cy
      .get('.c10 > input')
      .clear()
      .type(10);

    cy
      .get('.c11 > input')
      .clear()
      .type(8);

    cy
      .get('.c1 > input')
      .clear()
      .type(80);

    cy.get('button[name="add-c"]').click();
    cy
      .get('.c20 > input')
      .clear()
      .type(1);
    cy
      .get('.c2 > input')
      .clear()
      .type(9);
    cy.get('button[name="add-c"]').click();
    cy
      .get('.c31 > input')
      .clear()
      .type(1);
    cy
      .get('.c3 > input')
      .clear()
      .type(6);

    cy.contains('Maximize').click();
    cy.get('button[name="solve"]').click();
  });
});
