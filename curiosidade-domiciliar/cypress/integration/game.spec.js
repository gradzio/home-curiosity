/// <reference types="Cypress" />

import { finishExercise } from '../utils/exercises.utils';

const appUrl = Cypress.env('host');

context('Game variant', () => {
  it('should navigate to exercises', () => {
    cy.visit( `${appUrl}/games` );
    const countButtonText = cy.get('app-icon-button').contains('Count');
    countButtonText.parent().find('button').click();
    cy.location(('pathname')).should('include', 'count');
    finishExercise(['input'], {label: 'Voltar', path: 'games'})
  });
});
