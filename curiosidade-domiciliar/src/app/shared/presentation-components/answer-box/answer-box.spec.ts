import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AnswerBox } from './answer-box';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatRadioButton, MatInput } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AnswerBoxModule } from './answer-box.module';
import { ExerciseCollectionProvider } from 'src/tests/exercise-collection.provider';
import { ExerciseModel } from 'src/app/pages/subjects/lessons/topics/exercises/exercise.model';
import { SequenceBuilderModule } from '../sequence-builder/sequence-builder.module';
import { SequenceBuilder } from '../sequence-builder/sequence-builder';

@Component({
  template: `<app-answer-box
              (answerSubmitted)="onAnswered($event)"
              [item]="item">
              <img src="image.jpg" alt="image" />
             </app-answer-box>`,
})
class ImageAnswerBox {
  item = ExerciseCollectionProvider.SINGLE_WITH_INPUT.current;
  answeredValue: string;
  onAnswered(value: string) {
    this.answeredValue = value;
  }
}

@Component({
  template: `<app-answer-box
              (answerSubmitted)="onAnswered($event)"
              [item]="item">
              <img src="image.jpg" alt="image" />
             </app-answer-box>`,
})
class ImageAnswerBoxWithChoices {
  answeredValue: string;
  item = ExerciseCollectionProvider.SINGLE_WITH_RADIO_CHOICES.current;
  onAnswered(value: string) {
    this.answeredValue = value;
  }
}

@Component({
  template: `<app-answer-box
              (answerSubmitted)="onAnswered($event)"
              [item]="item">
              <img src="image.jpg" alt="image" />
             </app-answer-box>`,
})
class ImageAnswerBoxWithSequence {
  answeredValue: string;
  item = ExerciseCollectionProvider.SINGLE_WITH_SEQUENCE.current;
  onAnswered(value: string) {
    this.answeredValue = value;
  }
}

describe('AnswerBoxComponent', () => {
  describe('ImageAnswerBox', () => {
  let component: ImageAnswerBox | ImageAnswerBoxWithChoices;
  let fixture: ComponentFixture<ImageAnswerBox>;
  let answerBoxElement: DebugElement;
  let inputElement: DebugElement;
  let radioElements: DebugElement[];
  let buttonElement: DebugElement;
  let sequenceElement: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [AnswerBoxModule, SequenceBuilderModule],
        declarations: [ ImageAnswerBox ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ImageAnswerBox);
      component = fixture.componentInstance;
      fixture.detectChanges();
      answerBoxElement = fixture.debugElement.query(By.css('.app-answer-box'));
      inputElement = answerBoxElement.query(By.directive(MatInput));
      radioElements = answerBoxElement.queryAll(By.directive(MatRadioButton));
      sequenceElement = answerBoxElement.query(By.directive(SequenceBuilder));
      buttonElement = answerBoxElement.query(By.css('.app-answer-box__button'));
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(answerBoxElement).toBeTruthy();
      expect(inputElement).toBeTruthy();
      expect(sequenceElement).toBeNull();
      expect(radioElements.length).toEqual(0);
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
  });

  describe('AnswerBoxComponentWithChoices', () => {
    let component: ImageAnswerBoxWithChoices;
    let fixture: ComponentFixture<ImageAnswerBoxWithChoices>;
    let answerBoxElement: DebugElement;
    let inputElement: DebugElement;
    let radioElements: DebugElement[];
    let buttonElement: DebugElement;
    let sequenceElement: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule, CommonModule, FlexLayoutModule, SequenceBuilderModule],
        declarations: [ AnswerBox, ImageAnswerBoxWithChoices ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ImageAnswerBoxWithChoices);
      component = fixture.componentInstance;
      fixture.detectChanges();
      answerBoxElement = fixture.debugElement.query(By.css('.app-answer-box'));
      inputElement = answerBoxElement.query(By.css('.app-answer-box__answer-input'));
      radioElements = answerBoxElement.queryAll(By.directive(MatRadioButton));
      sequenceElement = answerBoxElement.query(By.directive(SequenceBuilder));
      buttonElement = answerBoxElement.query(By.css('.app-answer-box__button'));
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(answerBoxElement).toBeTruthy();
      expect(inputElement).toBeNull();
      expect(sequenceElement).toBeNull();
      expect(radioElements.length).toEqual(3);
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
      const item = <ExerciseModel>component.item;
      expect(component.answeredValue).toEqual(item.choices[2].value);
      expect(radioElements[2].classes['mat-radio-checked']).toEqual(false);
    });

    it('should render html in label', () => {
      const item = <ExerciseModel>component.item;
      const radioImageContainer = radioElements[2].query(By.css('label [data-selector="radio-image-container"]'));
      expect(radioImageContainer.properties.innerHTML).toEqual(item.choices[2].label);
    });
  });

  describe('AnswerBoxWithSequence', () => {
    let component: AnswerBox;
    let fixture: ComponentFixture<AnswerBox>;
    const sequenceBuilderSpy = jasmine.createSpyObj('SequenceBuilder', ['reset']);

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule, CommonModule, FlexLayoutModule],
        declarations: [ AnswerBox, SequenceBuilder ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AnswerBox);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should bind item to sequenceBuilder', () => {
      component.sequenceBuilder = sequenceBuilderSpy;
      component.item = ExerciseCollectionProvider.SINGLE_WITH_RADIO_CHOICES.current;
    });
  });

  describe('ImageAnswerBoxWithSequence', () => {
    let component: ImageAnswerBoxWithSequence;
    let fixture: ComponentFixture<ImageAnswerBoxWithSequence>;
    let answerBoxElement: DebugElement;
    let inputElement: DebugElement;
    let radioElements: DebugElement[];
    let buttonElement: DebugElement;
    let sequenceElement: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule, CommonModule, FlexLayoutModule, SequenceBuilderModule],
        declarations: [ AnswerBox, ImageAnswerBoxWithSequence ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ImageAnswerBoxWithSequence);
      component = fixture.componentInstance;
      fixture.detectChanges();
      answerBoxElement = fixture.debugElement.query(By.css('.app-answer-box'));
      inputElement = answerBoxElement.query(By.css('.app-answer-box__answer-input'));
      radioElements = answerBoxElement.queryAll(By.directive(MatRadioButton));
      sequenceElement = answerBoxElement.query(By.directive(SequenceBuilder));
      buttonElement = answerBoxElement.query(By.css('.app-answer-box__button'));
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(answerBoxElement).toBeTruthy();
      expect(inputElement).toBeNull();
      expect(radioElements.length).toEqual(0);
      expect(sequenceElement).toBeTruthy();
      expect(buttonElement).toBeTruthy();
      expect(buttonElement.nativeElement.disabled).toBe(true);
    });

    it('should output an answer', () => {
      sequenceElement.query(By.css('[data-selector="item-creator"]')).nativeElement.click();

      fixture.detectChanges();

      expect(sequenceElement.queryAll(By.css('[data-selector="item-created"]')).length).toEqual(1);

      expect(buttonElement.nativeElement.disabled).toBe(false);
      buttonElement.nativeElement.click();

      fixture.detectChanges();

      const item = <ExerciseModel>component.item;
      expect(component.answeredValue).toEqual(item.choices[0].value);
    });
  });
});
