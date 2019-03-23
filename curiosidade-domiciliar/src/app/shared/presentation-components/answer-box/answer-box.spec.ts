import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerBox } from './answer-box';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

describe('AnswerBoxComponent', () => {
  let component: ImageAnswerBox;
  let fixture: ComponentFixture<ImageAnswerBox>;
  let answerBoxElement: DebugElement;
  let headerElement: DebugElement;
  let inputElement: DebugElement;
  let buttonElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerBox, ImageAnswerBox ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAnswerBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
    answerBoxElement = fixture.debugElement.query(By.css('.app-answer-box'));
    headerElement = answerBoxElement.query(By.css('.app-answer-box__header'))
    inputElement = answerBoxElement.query(By.css('.app-answer-box__answer'));
    buttonElement = answerBoxElement.query(By.css('.app-answer-box__button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(answerBoxElement).toBeTruthy();
    expect(inputElement).toBeTruthy();
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
    buttonElement.nativeElement.dispatchEvent(new Event('click'));
    
    expect(component.answeredValue).toEqual('1');
  });

  it('should render header', () => {
    expect(headerElement.nativeElement.textContent).toContain('Header');
  });
});

@Component({
  template: `<app-answer-box
              (answerSubmitted)="onAnswered($event)"
              header="Header">
              <img src="image.jpg" alt="image" />
             </app-answer-box>`,
})
class ImageAnswerBox {
  answeredValue: string;
  onAnswered(value: string) {
    this.answeredValue = value;
  }
}
