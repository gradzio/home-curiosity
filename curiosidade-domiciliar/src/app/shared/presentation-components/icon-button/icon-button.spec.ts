import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconButton } from './icon-button';
import { Component } from '@angular/core';

@Component({
    template: `<app-icon-button
                [item]="itemVM">
               </app-answer-box>`,
  })
  class ImageAnswerBox {
    answeredValue: string;
    onAnswered(value: string) {
      this.answeredValue = value;
    }
  }

fdescribe('IconButton', () => {
  let component: IconButton;
  let fixture: ComponentFixture<IconButton>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconButton ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind icon button vm', () => {

  });
});
