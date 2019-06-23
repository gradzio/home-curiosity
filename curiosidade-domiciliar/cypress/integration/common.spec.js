/// <reference types="Cypress" />
const appUrl = Cypress.env('host');

context('Sidebar navigation', () => {
  const openDrawer = () => {
    cy.visit( `${appUrl}` );
    cy.get('[data-selector="sidebar-open"]').click();
  }
  it('should open drawer and navigate to subjects', () => {
    openDrawer();
    cy.get('[data-selector="math-link"]').click();
    cy.location('pathname').should('include', 'subjects/math');
    cy.location('pathname').should('not.include', 'lessons');
    cy.location('pathname').should('not.include', 'games');
  })

  it('should open drawer and navigate to games', () => {
    openDrawer();
    cy.get('[data-selector="games-link"]').click();
    cy.location('pathname').should('include', 'games');
    cy.location('pathname').should('not.include', 'subjects');
  });
})