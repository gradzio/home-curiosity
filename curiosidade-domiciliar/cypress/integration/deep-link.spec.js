/// <reference types="Cypress" />
const appUrl = Cypress.env('host');

context('Deep linking navigation', () => {
  it('should load lessons', () => {
    cy.visit(`${appUrl}/subjects/math/lessons/lessonguid1`);
    cy.get('app-topics iframe');
    cy.get('app-topics').contains('Practicar');
    cy.get('[data-selector="back-button"]').click();
    cy.location('pathname').should('not.include', 'lessons');
  });

  it('should load exercises', () => {
    cy.visit(`${appUrl}/subjects/math/lessons/lessonguid1/topics/topicguid1/exercises`);
    cy.get('app-progress-bar').contains(exerciseCountDown);
    cy.contains('Verificar').should('be.disabled');
  });
});