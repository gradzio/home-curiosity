import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsComponent } from './topics.component';
import { PresentationComponentsModule } from 'src/app/shared/presentation-components/presentation-components.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { SubjectState } from '../../subject.state';
import { ExercisesState } from './exercises/exercises.state';
import { ExercisesService } from './exercises/exercises.service';
import { LessonsService } from '../lessons.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material.module';
import { SubjectStateProvider } from 'src/tests/subject-state.provider';
import { TimerService } from 'src/app/shared/services/timer.service';

describe('TopicsComponent', () => {
  let component: TopicsComponent;
  let fixture: ComponentFixture<TopicsComponent>;
  let store;
  const activatedRoute = new ActivatedRoute();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsComponent ],
      imports: [
        NgxsModule.forRoot([SubjectState, ExercisesState]),
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule,
        PresentationComponentsModule
      ],
      providers: [
        ExercisesService,
        LessonsService,
        {provide: ActivatedRoute, useValue: activatedRoute},
        TimerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    store.reset(SubjectStateProvider.TWO_LESSONS_FIRST_SELECTED);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a back button', () => {
    expect(fixture.debugElement.query(By.css('.mat-mini-fab'))).toBeTruthy();
  });
});
