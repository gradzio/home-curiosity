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

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;
  let exerciseService;
  let notificationService;
  let answersService;
  let changeDetectorRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesComponent ],
      imports: [
        RouterTestingModule,
        CommonModule,
        MaterialModule,
        PresentationComponentsModule,
        HttpClientTestingModule
      ],
      providers: [ ExercisesService, AnswersService, NotificationService, ChangeDetectorRef ]
    })
    .compileComponents();
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesComponent);
    component = fixture.componentInstance;
    exerciseService = TestBed.get(ExercisesService);
    notificationService = TestBed.get(NotificationService);
    answersService = TestBed.get(AnswersService);
    changeDetectorRef = TestBed.get(ChangeDetectorRef);
    spyOn(exerciseService, 'exercises$').and.returnValue(of(ExerciseCollectionProvider.two));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set right defaults', () => {
    component.ngOnInit();
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

  it('should show positive snackbar and call nextExercise on correct answer', () => {
    spyOn(answersService, 'create').and.returnValue(of({'success': true, 'exerciseGuid': 'guid1'}));
    spyOn(notificationService, 'notifyCorrectAnswer').and.returnValue(of({dismissedByAction: true}));
    spyOn(exerciseService, 'nextExercise');
    component.onAnswerSubmitted('2');

    expect(answersService.create).toHaveBeenCalledWith('2', 'guid1');
    expect(notificationService.notifyCorrectAnswer).toHaveBeenCalled();
    expect(exerciseService.nextExercise).toHaveBeenCalled();
  });

  it('should show negative snackbar on wrong answer', () => {
    spyOn(answersService, 'create').and.returnValue(of({'success': false, 'exerciseGuid': 'guid1'}));
    spyOn(notificationService, 'notifyWrongAnswer');
    spyOn(exerciseService, 'nextExercise');
    component.onAnswerSubmitted('2');

    expect(answersService.create).toHaveBeenCalledWith('2', 'guid1');
    expect(notificationService.notifyWrongAnswer).toHaveBeenCalled();
    expect(exerciseService.nextExercise).not.toHaveBeenCalled();
  });
});