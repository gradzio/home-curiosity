/// <reference types="Cypress" />
const appUrl = 'http://localhost:4200/';
const exerciseSetup = [2, 3];

context('Navigation of the Math subject', () => {
  it('should load lessons', () => {
    cy.visit( `${appUrl}subjects/math/lessons/lessonguid1` );
    cy.get('app-topics iframe');
    cy.get('app-topics').contains('Practicar');
    cy.get('[data-selector="back-button"]').click();
    cy.location('pathname').should('not.include', 'lessons');
  });

  it('should load exercises', () => {
    cy.visit( `${appUrl}subjects/math/lessons/lessonguid1/topics/topicguid1/exercises`);
    cy.get('app-progress-bar').contains('1 / 2');
    cy.contains('Verificar').should('be.disabled');
  });

  it('should navigate to exercises', () => {
    cy.visit( `${appUrl}subjects/math` );
    cy.get('app-icon-button button').first().click();
    cy.location(('pathname')).should('include', 'lessons');
    cy.contains('Practicar').click();
    
    finishExercise(exerciseSetup.shift());
    cy.location(('pathname')).should('include', 'lessons');
    cy.contains('Practicar').click();
    finishExercise(exerciseSetup.shift());
    cy.location(('pathname')).should('include', 'lessons');
    cy.get('h2').contains('Parabéns');
    cy.get('p').contains('Você acertou todos os assuntos');
    cy.contains('Próxima aula').click();
    cy.location('pathname').should('include.not', 'lessons');
    
    cy.get('app-icon-button button').first().should('be.disabled');
  });

  const finishExercise = (exerciseCount) => {
    cy.location(('pathname')).should('include', 'exercises');
    for(let i = 0; i < exerciseCount; i++) {
      cy.get('app-progress-bar').contains((i + 1) + ' / ' + exerciseCount);
      typeAndClick();
      cy.get('simple-snack-bar').contains('Você acertou!');
    }
    cy.get('h2').should('contain', 'Bom trabalho!');
    cy.contains('Próximo assunto').click();
    cy.location(('pathname')).should('include', 'lessons');
  };

  const typeAndClick = () => {
      cy.get('[data-selector="answer-input"]').type(1);
      cy.contains('Verificar').click();
  };
  })
  