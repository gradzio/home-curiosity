/// <reference types="Cypress" />

import { finishExercise } from '../utils/exercises.utils';

const appUrl = Cypress.env('host');

context('Game variant', () => {
  it('should navigate to choice game', () => {
    testGameNavigation({gameName: 'Choice', gameType: 'radio'})
  });

  it('should navigate to counter game', () => {
    testGameNavigation({gameName: 'Count', gameType: 'input'})
  });

  it('should navigate to Order game', () => {
    testGameNavigation({gameName: 'Order', gameType: 'sequence'})
  })

  const testGameNavigation = ({gameName, gameType}) => {
    cy.visit( `${appUrl}/games` );
    const countButtonText = cy.get('app-icon-button').contains(gameName);
    countButtonText.parent().find('button').click();
    cy.location(('pathname')).should('include', gameName.toLowerCase());
    finishExercise(['radio'], {label: 'Voltar', path: 'games'})
  } 
});
