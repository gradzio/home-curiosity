import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesComponent } from './exercises.component';
import { ExercisesService } from './exercises.service.stub';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PresentationComponentsModule } from '../../presentation-components/presentation-components.module';
import { Exercise } from './exercise.model';
import { ExerciseProvider } from 'src/tests/exercise.provider';
import { MaterialModule } from 'src/app/material.module';
import { NotificationService } from './notification.service';
import { Collection } from 'src/app/core/collection';

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
        PresentationComponentsModule
      ],
      providers: [ ExercisesService, NotificationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesComponent);
    component = fixture.componentInstance;
    exerciseService = TestBed.get(ExercisesService);
    notificationService = TestBed.get(NotificationService);
    spyOn(exerciseService, 'exercises$').and.returnValue(of(new Collection(ExerciseProvider.twoNotCompleted)));
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
    component.currentExercise$
    .subscribe(exercise => {
      expect(exercise).toEqual(jasmine.any(Exercise))
      expect(exercise).toEqual(ExerciseProvider.twoNotCompleted[0]);
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
