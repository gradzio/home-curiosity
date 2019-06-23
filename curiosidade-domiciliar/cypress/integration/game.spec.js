/// <reference types="Cypress" />

import { finishExercise } from '../utils/exercises.utils';

const appUrl = Cypress.env('host');

context('Game variant', () => {
  it('should navigate to choice game', () => {
    cy.visit( `${appUrl}/games` );
    const countButtonText = cy.get('app-icon-button').contains('Choice');
    countButtonText.parent().find('button').click();
    cy.location(('pathname')).should('include', 'choice');
    finishExercise(['radio'], {label: 'Voltar', path: 'games'})
  });

  it('should navigate to counter game', () => {
    cy.visit( `${appUrl}/games` );
    const countButtonText = cy.get('app-icon-button').contains('Count');
    countButtonText.parent().find('button').click();
    cy.location(('pathname')).should('include', 'count');
    finishExercise(['input'], {label: 'Voltar', path: 'games'})
  });
});
