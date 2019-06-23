/// <reference types="Cypress" />

import { finishExercise } from '../utils/exercises.utils';

const appUrl = Cypress.env('host');

const exerciseSetup = [
  ['radio'],
  ['input'],
  ['sequence']
];

context('Navigation of the Math subject', () => {
  it('should navigate to exercises', () => {
    cy.visit( `${appUrl}/subjects/math` );
    cy.get('app-icon-button button').first().click();
    cy.location(('pathname')).should('include', 'lessons');
    cy.contains('Practicar').click();
    
    exerciseSetup.forEach((exercises, index) => {
      finishExercise(exercises, {label: 'Próximo assunto', path: 'lessons'});
      cy.location(('pathname')).should('include', 'lessons');
      if (index < exerciseSetup.length - 1) {
        cy.contains('Practicar').click();
      }
    });
    shouldShowCongratsLessonPage();
    cy.contains('Próxima aula').click();
    cy.location('pathname').should('include.not', 'lessons');
    
    cy.get('app-icon-button button').first().should('be.disabled');
  });

  const shouldShowCongratsLessonPage = () => {
    cy.get('h2').contains('Parabéns');
    cy.get('p').contains('Você acertou todos os assuntos');
    cy.get('img[data-selector="congrats-image"]').should('have.attr', 'src', 'https://drive.google.com/uc?export=view&id=17JBc2K6zXnzVbi2InF3aUzulYl1Hf5wI');
    cy.contains('Próxima aula');
  };
});
  