import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceBuilder } from './sequence-builder';
import { MaterialModule } from 'src/app/material.module';
import { By } from '@angular/platform-browser';
import { MatIcon } from '@angular/material';
import { Component } from '@angular/core';
import { Option } from '../answer-box/option.interface';

@Component({
  template: `<app-sequence-builder
              [choices]="choices"
              [maxItems]="maxItems"
              (change)="onAnswered($event)">
             </app-sequence-builder>`,
})
class ImageAndTextSequenceBuilder {
  answer: string;
  maxItems = 5;
  choices: Option[] = [{label: '<img src="/image.jpg">', value: 'image'}, {label: 'text', value: 'text'}];
  onAnswered(answer: string) {
    this.answer = answer;
  }
}

describe('SequenceBuilder', () => {
  let component: ImageAndTextSequenceBuilder;
  let fixture: ComponentFixture<ImageAndTextSequenceBuilder>;
  let sequencBuilderElement;
  let itemCreatorElements;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceBuilder, ImageAndTextSequenceBuilder ],
      imports: [ MaterialModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAndTextSequenceBuilder);
    component = fixture.componentInstance;
    sequencBuilderElement = fixture.debugElement.query(By.directive(SequenceBuilder));
    fixture.detectChanges();
    itemCreatorElements = sequencBuilderElement.queryAll(By.css('[data-selector="item-creator"]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(itemCreatorElements.length).toEqual(2);
  });

  it('should add item with icon', () => {
    itemCreatorElements[0].nativeElement.click();
    itemCreatorElements[1].nativeElement.click();

    const itemsCreatedElements = sequencBuilderElement.queryAll(By.css('[data-selector="item-created"]'));
    expect(itemsCreatedElements.length).toEqual(2);
    expect(itemsCreatedElements[0].properties.innerHTML).toEqual(itemCreatorElements[0].properties.innerHTML);
    expect(itemsCreatedElements[1].properties.innerHTML).toEqual(itemCreatorElements[1].properties.innerHTML);
    expect(component.answer).toEqual('image,text');
  });

  it('should remove added item', () => {
    itemCreatorElements[0].nativeElement.click();
    itemCreatorElements[1].nativeElement.click();

    fixture.detectChanges();

    const itemCreatedElements = sequencBuilderElement.queryAll(By.css('[data-selector="item-created"]'));

    expect(itemCreatedElements.length).toEqual(2);

    itemCreatedElements[0].nativeElement.click();

    const itemCreatedElementsAfterDelete = sequencBuilderElement.queryAll(By.css('[data-selector="item-created"]'));
    expect(itemCreatedElementsAfterDelete.length).toEqual(1);
    expect(itemCreatedElementsAfterDelete[0].properties.innerHTML).toEqual(itemCreatorElements[1].properties.innerHTML);
    expect(component.answer).toEqual('text');
  });

  it('should not add more than max items', () => {
    for (let i = 0; i <= component.maxItems + 1; i++) {
      itemCreatorElements[0].nativeElement.click();
    }

    expect(sequencBuilderElement.queryAll(By.css('[data-selector="item-created"]')).length).toEqual(component.maxItems);
  });
});
