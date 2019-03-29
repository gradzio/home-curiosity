import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesComponent } from './exercises.component';
import { ExercisesService } from './exercises.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PresentationComponentsModule } from '../../presentation-components/presentation-components.module';
import { Exercise } from './exercise.model';
import { MaterialModule } from 'src/app/material.module';
import { NotificationService } from './notification.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExerciseCollectionProvider } from 'src/tests/exercise-collection.provider';
import { last } from 'rxjs/operators';

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;
  let exerciseService;
  let notificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesComponent ],
      imports: [
        CommonModule,
        MaterialModule,
        PresentationComponentsModule,
        HttpClientTestingModule
      ],
      providers: [ ExercisesService, NotificationService ]
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
    spyOn(exerciseService, 'exercises$').and.returnValue(of(ExerciseCollectionProvider.two));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get exercises from a service', () => {
    spyOn(exerciseService, 'getAll');
    component.ngOnInit();
    expect(exerciseService.getAll).toHaveBeenCalled();
  });

  it('should set right defaults', () => {
    component.ngOnInit();
    component.exercises$
    .pipe(
      last()
    )
    .subscribe(exercises => {
      expect(exercises.current).toEqual(jasmine.any(Exercise));
      expect(exercises.progress.current).toEqual(1);
    })
    .unsubscribe();
  });

  it('should show positive snackbar on correct answer', () => {
    spyOn(exerciseService, 'postAnswer').and.returnValue(of({'success': true, 'exerciseGuid': 'guid1'}));
    spyOn(notificationService, 'notifyCorrectAnswer');
    component.onAnswerSubmitted("2");

    expect(exerciseService.postAnswer).toHaveBeenCalledWith('2');
    expect(notificationService.notifyCorrectAnswer).toHaveBeenCalled();
  });

  it('should show negative snackbar on wrong answer', () => {
    spyOn(exerciseService, 'postAnswer').and.returnValue(of({'success': false, 'exerciseGuid': 'guid1'}));
    spyOn(notificationService, 'notifyWrongAnswer');
    component.onAnswerSubmitted("2");

    expect(exerciseService.postAnswer).toHaveBeenCalledWith('2');
    expect(notificationService.notifyWrongAnswer).toHaveBeenCalled();
  });

  it('should call nextExercise on correct answer', () => {
    notificationService.correctAnswerDismissed$ = of(true);
    spyOn(exerciseService, 'nextExercise');
    component.ngOnInit();

    expect(exerciseService.nextExercise).toHaveBeenCalled();
  });
});
