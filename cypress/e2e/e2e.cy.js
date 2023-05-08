describe('visit', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('visit homepage check', () => {
    cy.get(':nth-child(1) > .pokemon-name').should('contain', 'Bulbasaur');
  });


  it('check Bulbasaur page', () => {
    cy.get(':nth-child(1) > .pokemon-name').click();
    cy.get('#pokemon-name').should('contain', 'Bulbasaur');
  });

})