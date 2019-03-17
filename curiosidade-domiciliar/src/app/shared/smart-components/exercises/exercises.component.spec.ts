import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesComponent } from './exercises.component';
import { ExercisesService } from './exercises.service.stub';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PresentationComponentsModule } from '../../presentation-components/presentation-components.module';
import { Exercise } from './exercise.model';
import { ExerciseProvider } from 'src/tests/exercise.provider';
import { MaterialModule } from 'src/app/material.module';
import { MatSnackBar } from '@angular/material';

fdescribe('ExercisesComponent', () => {
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
      providers: [ ExercisesService, MatSnackBar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesComponent);
    component = fixture.componentInstance;
    exerciseService = TestBed.get(ExercisesService);
    notificationService = TestBed.get(MatSnackBar);
    spyOn(exerciseService, 'getAll').and.returnValue(of(ExerciseProvider.twoNotCompleted));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get exercises from a service', () => {
    component.ngOnInit();
    expect(exerciseService.getAll).toHaveBeenCalled();
  });

  it('should set current exercise as first', () => {
    component.ngOnInit();
    component.currentExercise$.subscribe(exercise => {
      expect(exercise).toEqual(jasmine.any(Exercise))
      expect(exercise).toEqual(ExerciseProvider.twoNotCompleted[0]);
    });
  });

  it('should set current exercise as second', () => {
    exerciseService.getAll.and.returnValue(of(ExerciseProvider.twoFirstCompleted));
    component.ngOnInit();
    component.currentExercise$.subscribe(exercise => {
      expect(exercise).toEqual(jasmine.any(Exercise))
      expect(exercise).toEqual(ExerciseProvider.twoNotCompleted[1]);
    });
  });

  it('should show positive snackbar on correct answer', () => {
    spyOn(exerciseService, 'postAnswer').and.returnValue(of({'success': true, 'exerciseGuid': 'guid1'}));
    spyOn(notificationService, 'open');
    component.onAnswerSubmitted("2");

    expect(exerciseService.postAnswer).toHaveBeenCalledWith('guid1', "2");
    expect(notificationService.open).toHaveBeenCalledWith('Congrats!', null, {
      panelClass: ['snackbar-success'],    
    });
  });

  it('should show negative snackbar on wrong answer', () => {
    spyOn(exerciseService, 'postAnswer').and.returnValue(of({'success': false, 'exerciseGuid': 'guid1'}));
    spyOn(notificationService, 'open');
    component.onAnswerSubmitted("2");

    expect(exerciseService.postAnswer).toHaveBeenCalledWith('guid1', "2");
    expect(notificationService.open).toHaveBeenCalledWith('Incorrect! Try again...', null, {
      panelClass: ['snackbar-error'],    
    });
  });
});
