/// <reference types="Cypress" />
const appUrl = Cypress.env('host');

context('Common tests for all variants', () => {
  it('should open drawer', () => {
    cy.visit( `${appUrl}` );
    cy.get('[data-selector="sidebar-open"]').click();
    cy.get('[data-selector="math-link"]').click();
    cy.location('pathname').should('include', 'subjects/math');
    cy.location('pathname').should('not.include', 'lessons');
  });
})