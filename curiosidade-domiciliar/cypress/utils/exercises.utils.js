/// <reference types="Cypress" />
const appUrl = Cypress.env('host');
const exerciseSetup = [
  ['radio'],
  ['sequence'],
  ['input']
];
const exerciseCountDown = 20;

export const finishExercise = (exerciseConfig, {label, path}) => {
  cy.get('app-progress-bar').contains(exerciseCountDown);
  for(let i = 0; i < exerciseConfig.length; i++) {
    cy.get('simple-snack-bar').should('not.be.visible');
    answerExercise(exerciseConfig[i]);
    cy.get('simple-snack-bar').should('be.visible').contains('Você acertou!');
  }
  shouldShowCongratsTopicPage(exerciseConfig.length);
  cy.contains(label).click();
  cy.location(('pathname')).should('include', path);
};

const shouldShowCongratsTopicPage = (correctCount) => {
  cy.contains('h2', 'Bom trabalho!', {timeout: exerciseCountDown * 1000});
  cy.contains('h3', `Você acertou ${correctCount} exercícios`)
  cy.get('img[data-selector="congrats-image"]').should('have.attr', 'src', 'https://drive.google.com/uc?export=view&id=10atErlnYlvXz2XjiOHWGs36J3bIUm_6M');
}

const answerExercise = (selectorType) => {
  if (selectorType === 'input') {
    cy.get('[data-selector="answer-input"]').type(1);
  } else if (selectorType === 'radio') {
    cy.get('[data-selector="answer-radio"]').first().click();
  } else if (selectorType === 'sequence') {
    cy.get('[data-selector="item-creator"]').first().click();
  }
  cy.contains('Verificar').click();
};