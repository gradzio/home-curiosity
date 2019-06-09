/// <reference types="Cypress" />
const appUrl = Cypress.env('host');
const exerciseSetup = [
  ['radio'],
  ['sequence'],
  ['input']
];
const exerciseCountDown = 20;

context('Game variant', () => {
  it('should navigate to exercises', () => {
    cy.visit( `${appUrl}/games` );
    const countButtonText = cy.get('app-icon-button').contains('Count');
    countButtonText.parent().find('button').click();
    cy.location(('pathname')).should('include', 'count');
  });
});
  