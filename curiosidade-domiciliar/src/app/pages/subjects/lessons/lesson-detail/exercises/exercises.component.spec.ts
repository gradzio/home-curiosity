import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesComponent } from './exercises.component';
import { ExercisesService } from './exercises.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExerciseCollectionProvider } from 'src/tests/exercise-collection.provider';
import { last } from 'rxjs/operators';
import { PresentationComponentsModule } from 'src/app/shared/presentation-components/presentation-components.module';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ExerciseModel } from './exercise.model';
import { RouterTestingModule } from '@angular/router/testing';
import { AnswersService } from './answers.service';
import { ChangeDetectorRef } from '@angular/core';
import { LessonsService } from '../../lessons.service';
import { Store, NgxsModule } from '@ngxs/store';
import { ExercisesState, AnsweredCorrectly } from './exercises.state';
import { SubjectState } from '../../../subject.state';
import { ActivatedRoute } from '@angular/router';

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;
  let notificationService;
  let answersService;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesComponent ],
      imports: [
        NgxsModule.forRoot([SubjectState, ExercisesState]),
        RouterTestingModule,
        CommonModule,
        MaterialModule,
        PresentationComponentsModule,
        HttpClientTestingModule
      ],
      providers: [ {
        provide: ActivatedRoute,
        useValue: {
          params: of({lessonGuid: 'lessonGuid', topicGuid: 'topicGuid'})
        }
      }, AnswersService, ExercisesService, LessonsService, NotificationService, ChangeDetectorRef ]
    })
    .compileComponents();
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.get(NotificationService);
    answersService = TestBed.get(AnswersService);
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set right defaults', () => {
    component.exercises$
    .pipe(
      last()
    )
    .subscribe(exercises => {
      expect(exercises.current).toEqual(jasmine.any(ExerciseModel));
      expect(exercises.progress.current).toEqual(1);
    })
    .unsubscribe();
  });

  it('should show positive snackbar and trigger AnsweredCorrectly even on correct answer', () => {
    spyOn(answersService, 'create').and.returnValue(of({'success': true, 'exerciseGuid': 'guid1'}));
    spyOn(notificationService, 'notifyCorrectAnswer').and.returnValue(of({dismissedByAction: true}));
    spyOn(store, 'dispatch');
    component.onAnswerSubmitted('2');

    expect(answersService.create).toHaveBeenCalledWith('2', 'guid1');
    expect(notificationService.notifyCorrectAnswer).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(new AnsweredCorrectly('lessonGuid', 'topicGuid'));
  });

  it('should show negative snackbar on wrong answer', () => {
    spyOn(answersService, 'create').and.returnValue(of({'success': false, 'exerciseGuid': 'guid1'}));
    spyOn(notificationService, 'notifyWrongAnswer');
    spyOn(store, 'dispatch');
    component.onAnswerSubmitted('2');

    expect(answersService.create).toHaveBeenCalledWith('2', 'guid1');
    expect(notificationService.notifyWrongAnswer).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should get backlink', () => {
      component.backLink$
        .subscribe(backLink => expect(backLink).toEqual('/subjects/math/lessons/lessonGuid'))
        .unsubscribe();
  });
});
