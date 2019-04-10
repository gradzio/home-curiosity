import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswerBox } from './answer-box';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatRadioButton, MatInput } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  template: `<app-answer-box
              (answerSubmitted)="onAnswered($event)"
              [choices]="choices"
              header="Header">
              <img src="image.jpg" alt="image" />
             </app-answer-box>`,
})
class ImageAnswerBox {
  choices = null;
  answeredValue: string;
  onAnswered(value: string) {
    this.answeredValue = value;
  }
}

@Component({
  template: `<app-answer-box
              (answerSubmitted)="onAnswered($event)"
              header="Header"
              [choices]="choices">
              <img src="image.jpg" alt="image" />
             </app-answer-box>`,
})
class ImageAnswerBoxWithChoices {
  answeredValue: string;
  choices = ['1', '2', '3'];
  onAnswered(value: string) {
    this.answeredValue = value;
  }
}

describe('AnswerBoxComponent', () => {
  describe('ImageAnswerBox', () => {
  let component: ImageAnswerBox | ImageAnswerBoxWithChoices;
  let fixture: ComponentFixture<ImageAnswerBox>;
  let answerBoxElement: DebugElement;
  let headerElement: DebugElement;
  let inputElement: DebugElement;
  let radioElements: DebugElement[];
  let buttonElement: DebugElement;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule, FlexLayoutModule],
        declarations: [ AnswerBox, ImageAnswerBox ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ImageAnswerBox);
      component = fixture.componentInstance;
      fixture.detectChanges();
      answerBoxElement = fixture.debugElement.query(By.css('.app-answer-box'));
      headerElement = answerBoxElement.query(By.css('.app-answer-box__header'));
      inputElement = answerBoxElement.query(By.directive(MatInput));
      radioElements = answerBoxElement.queryAll(By.directive(MatRadioButton));
      buttonElement = answerBoxElement.query(By.css('.app-answer-box__button'));
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(answerBoxElement).toBeTruthy();
      expect(inputElement).toBeTruthy();
      expect(radioElements.length).toEqual(0);
      expect(headerElement).toBeTruthy();
      expect(buttonElement).toBeTruthy();
      expect(buttonElement.nativeElement.disabled).toBe(true);
    });

    it('should project image', () => {
      expect(answerBoxElement.query(By.css('img'))).toBeTruthy();
    });

    it('should output an answer', () => {
      inputElement.nativeElement.value = 1;
      inputElement.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(buttonElement.nativeElement.disabled).toBe(false);
      buttonElement.nativeElement.click();

      expect(component.answeredValue).toEqual('1');
    });

    it('should render header', () => {
      expect(headerElement.nativeElement.textContent).toContain('Header');
    });
  });

  describe('AnswerBoxComponentWithChoices', () => {
    let component: ImageAnswerBoxWithChoices;
    let fixture: ComponentFixture<ImageAnswerBoxWithChoices>;
    let answerBoxElement: DebugElement;
    let headerElement: DebugElement;
    let inputElement: DebugElement;
    let radioElements: DebugElement[];
    let buttonElement: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule, CommonModule, FlexLayoutModule],
        declarations: [ AnswerBox, ImageAnswerBoxWithChoices ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ImageAnswerBoxWithChoices);
      component = fixture.componentInstance;
      fixture.detectChanges();
      answerBoxElement = fixture.debugElement.query(By.css('.app-answer-box'));
      headerElement = answerBoxElement.query(By.css('.app-answer-box__header'));
      inputElement = answerBoxElement.query(By.css('.app-answer-box__answer-input'));
      radioElements = answerBoxElement.queryAll(By.directive(MatRadioButton));
      buttonElement = answerBoxElement.query(By.css('.app-answer-box__button'));
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(answerBoxElement).toBeTruthy();
      expect(inputElement).toBeNull();
      expect(radioElements.length).toEqual(3);
      expect(headerElement).toBeTruthy();
      expect(buttonElement).toBeTruthy();
      expect(buttonElement.nativeElement.disabled).toBe(true);
    });

    it('should output an answer', () => {
      radioElements[2].query(By.css('label')).nativeElement.click();

      fixture.detectChanges();

      expect(radioElements[2].classes['mat-radio-checked']).toEqual(true);

      expect(buttonElement.nativeElement.disabled).toBe(false);
      buttonElement.nativeElement.click();

      fixture.detectChanges();
      expect(component.answeredValue).toEqual(component.choices[2]);
      expect(radioElements[2].classes['mat-radio-checked']).toEqual(false);
    });
  });
});
