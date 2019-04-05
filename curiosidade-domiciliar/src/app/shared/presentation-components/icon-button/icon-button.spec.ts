import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconButton } from './icon-button';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { IconButtonInterface } from './icon-button.interface';

@Component({template: '<app-icon-button [item]="iconButton"></app-icon-button>'})
class BasicIconButton {
  public iconButton: IconButtonInterface = {name: 'name', icon: 'icon', navigationLink: 'navLink', isDisabled: false};
}


describe('IconButton', () => {
  let component: BasicIconButton;
  let fixture: ComponentFixture<BasicIconButton>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicIconButton, IconButton ],
      imports: [ RouterTestingModule, CommonModule, MaterialModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicIconButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
