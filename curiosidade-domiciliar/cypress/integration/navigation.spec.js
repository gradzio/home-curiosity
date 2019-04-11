/// <reference types="Cypress" />
const appUrl = Cypress.env('host');
const exerciseSetup = [
  ['radio', 'radio', 'radio', 'radio', 'radio', 'radio'],
  ['radio', 'input'],
  ['input', 'input', 'input']
];

context('Navigation of the Math subject', () => {
  it('should load lessons', () => {
    cy.visit( `${appUrl}/subjects/math/lessons/lessonguid1` );
    cy.get('app-topics iframe');
    cy.get('app-topics').contains('Practicar');
    cy.get('[data-selector="back-button"]').click();
    cy.location('pathname').should('not.include', 'lessons');
  });

  it('should load exercises', () => {
    cy.visit( `${appUrl}/subjects/math/lessons/lessonguid1/topics/topicguid1/exercises`);
    cy.get('app-progress-bar').contains('1 / 2');
    cy.contains('Verificar').should('be.disabled');
  });

  it('should navigate to exercises', () => {
    cy.visit( `${appUrl}/subjects/math` );
    cy.get('app-icon-button button').first().click();
    cy.location(('pathname')).should('include', 'lessons');
    cy.contains('Practicar').click();
    
    exerciseSetup.forEach((exercises, index) => {
      finishExercise(exercises);
      cy.location(('pathname')).should('include', 'lessons');
      if (index < exerciseSetup.length - 1) {
        cy.contains('Practicar').click();
      }
    });
    cy.get('h2').contains('Parabéns');
    cy.get('p').contains('Você acertou todos os assuntos');
    cy.contains('Próxima aula').click();
    cy.location('pathname').should('include.not', 'lessons');
    
    cy.get('app-icon-button button').first().should('be.disabled');
  });

  const finishExercise = (exerciseConfig) => {
    cy.location(('pathname')).should('include', 'exercises');
    for(let i = 0; i < exerciseConfig.length; i++) {
      cy.get('app-progress-bar').contains((i + 1) + ' / ' + exerciseConfig.length);
      answerExercise(exerciseConfig[i]);
      cy.get('simple-snack-bar').contains('Você acertou!');
    }
    cy.get('h2').should('contain', 'Bom trabalho!');
    cy.contains('Próximo assunto').click();
    cy.location(('pathname')).should('include', 'lessons');
  };


  const answerExercise = (selectorType) => {
    if (selectorType === 'input') {
      cy.get('[data-selector="answer-input"]').type(1);
    } else if (selectorType === 'radio') {
      cy.get('[data-selector="answer-radio"]').first().click();
    }
      
      cy.contains('Verificar').click();
  };
  })
  