import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBar } from './progress-bar';
import { MatProgressBarModule } from '@angular/material';
import { MaterialModule } from 'src/app/material.module';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Progress } from 'src/app/core/progress';

@Component({template: '<app-progress-bar [progress]="progress.makeProgressBarInterface()"></app-progress-bar>'})
class BasicProgressBar {
  public progress = new Progress(10);
}

describe('ProgressBar', () => {
  let component: BasicProgressBar;
  let fixture: ComponentFixture<BasicProgressBar>;
  let progressBarElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, MatProgressBarModule ],
      declarations: [ BasicProgressBar, ProgressBar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicProgressBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
    progressBarElement = fixture.debugElement.query(By.css('.app-progress-bar'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(progressBarElement).toBeTruthy();
  });

  it('should should have right defaults', () => {
    const progressCounterElement = progressBarElement.query(By.css('.app-progress-bar__counter'));
    expect(progressCounterElement.nativeElement.textContent).toContain('1 / 10');
  });
});
