/// <reference types="Cypress" />
const appUrl = Cypress.env('host');
const exerciseSetup = [
  ['radio'],
  ['sequence'],
  ['input']
];
const exerciseCountDown = 20;

context('Navigation of the Math subject', () => {
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

  const finishExercise = (exerciseConfig) => {
    cy.location(('pathname')).should('include', 'exercises');
    cy.get('app-progress-bar').contains(exerciseCountDown);
    for(let i = 0; i < exerciseConfig.length; i++) {
      cy.get('simple-snack-bar').should('not.be.visible');
      answerExercise(exerciseConfig[i]);
      cy.get('simple-snack-bar').should('be.visible').contains('Você acertou!');
    }
    shouldShowCongratsTopicPage(exerciseConfig.length);
    cy.contains('Próximo assunto').click();
    cy.location(('pathname')).should('include', 'lessons');
  };

  const shouldShowCongratsTopicPage = (correctCount) => {
    cy.contains('h2', 'Bom trabalho!', {timeout: exerciseCountDown * 1000});
    cy.contains('h3', `Você acertou ${correctCount} exercícios`)
    cy.contains('Próximo assunto');
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

  it('should open drawer', () => {
    cy.visit( `${appUrl}` );
    cy.get('[data-selector="sidebar-open"]').click();
    cy.get('[data-selector="math-link"]').click();
    cy.location('pathname').should('include', 'subjects/math');
    cy.location('pathname').should('not.include', 'lessons');
  });

  it('should load lessons', () => {
    cy.visit( `${appUrl}/subjects/math/lessons/lessonguid1` );
    cy.get('app-topics iframe');
    cy.get('app-topics').contains('Practicar');
    cy.get('[data-selector="back-button"]').click();
    cy.location('pathname').should('not.include', 'lessons');
  });

  it('should load exercises', () => {
    cy.visit( `${appUrl}/subjects/math/lessons/lessonguid1/topics/topicguid1/exercises`);
    cy.get('app-progress-bar').contains(exerciseCountDown);
    cy.contains('Verificar').should('be.disabled');
  });
  })
  