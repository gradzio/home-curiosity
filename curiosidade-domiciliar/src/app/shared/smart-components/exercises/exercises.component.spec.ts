import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ExercisesComponent } from './exercises.component';
import { ExercisesService } from './exercises.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { last } from 'rxjs/operators';
import { PresentationComponentsModule } from 'src/app/shared/presentation-components/presentation-components.module';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ExerciseModel } from './exercise.model';
import { RouterTestingModule } from '@angular/router/testing';
import { AnswersService } from './answers.service';
import { ChangeDetectorRef } from '@angular/core';
import { LessonsService } from '../../../pages/subjects/lessons/lessons.service';
import { Store, NgxsModule } from '@ngxs/store';
import { ExercisesState, AnsweredCorrectly } from './exercises.state';
import { SubjectState } from '../../../pages/subjects/subject.state';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Collection } from 'src/app/core/collection';
import { TimerService } from 'src/app/shared/services/timer.service';
import { CounterProgressModel } from './counter-progress.model';
import { ExercisesStateProvider } from 'src/tests/exercises-state.provider';

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
      }, AnswersService, ExercisesService, LessonsService, NotificationService, ChangeDetectorRef, TimerService ]
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

  it('should render content', () => {
    component.exercises$
        .subscribe((collection: Collection<ExerciseModel>) => {
          const contentElement = fixture.debugElement.query(By.css('[data-selector="exercise-content"]'));
          expect(contentElement.properties.innerHTML).toEqual(collection.current.content);
        })
        .unsubscribe();
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

  it('should render congrats page', () => {
    const stateMock = ExercisesStateProvider.COUNTDOWN_COMPLETED;
    const answeredCount = stateMock.exercises.answeredCount;
    store.reset(stateMock);
    fixture.detectChanges();
    const headerElement = fixture.debugElement.query(By.css('[data-selector="congrats-header"]'));
    const messageElement = fixture.debugElement.query(By.css('[data-selector="congrats-counter-message"]'));
    expect(headerElement.nativeElement.textContent).toEqual('Bom trabalho!');
    expect(messageElement.nativeElement.textContent).toEqual(`Você acertou ${answeredCount} exercícios`);
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

  it('should get count down progress', () => {
    store.reset(ExercisesStateProvider.TWO);
    component.countDownProgress$
      .subscribe(countDownProgress => expect(jasmine.any(CounterProgressModel)))
      .unsubscribe();
  });
});
