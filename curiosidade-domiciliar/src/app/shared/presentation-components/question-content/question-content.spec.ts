import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { QuestionContentModule } from './question-content.module';
import { QuestionContent } from './question-content';
import { Component } from '@angular/core';
import { QuestionContentConfig } from './question-content.interface';
import { By } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';

@Component({
template: `<app-question-content
            [config]="config">
            </app-question-content>`,
})
class QuestionContentContainer {
    config: QuestionContentConfig = {
        min: 1,
        max: 10
    };
}

describe('QuestionContent', () => {
  let component: QuestionContentContainer;
  let fixture: ComponentFixture<QuestionContentContainer>;
  let questionContentElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionContentContainer ],
      imports: [ QuestionContentModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionContentContainer);
    component = fixture.componentInstance;
    questionContentElement = fixture.debugElement.query(By.directive(QuestionContent));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(questionContentElement).toBeTruthy();
  });

  it('should display elements within a range', () => {
    const elements = questionContentElement.queryAll(By.css('[data-selector="question-content-element"]'));

    expect(elements.length).toBeGreaterThanOrEqual(component.config.min);
    expect(elements.length).toBeLessThanOrEqual(component.config.max);
  });

  it('should rerender questions', () => {
    component.config = {min: 11, max: 15};

    fixture.detectChanges();

    const elements = questionContentElement.queryAll(By.css('[data-selector="question-content-element"]'));

    expect(elements.length).toBeGreaterThanOrEqual(component.config.min);
    expect(elements.length).toBeLessThanOrEqual(component.config.max);
  });
});

describe('QuestionContent', () => {
  let component: QuestionContent;
  let fixture: ComponentFixture<QuestionContent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ QuestionContentModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get right columns', () => {
      component.config = {min: 1, max: 10};

      expect(component.gridColumns).toEqual(Math.ceil(Math.sqrt(10)));
  });
});
