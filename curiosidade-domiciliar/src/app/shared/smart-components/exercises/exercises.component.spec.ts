import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesComponent } from './exercises.component';
import { ExercisesService } from './exercises.service.stub';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PresentationComponentsModule } from '../../presentation-components/presentation-components.module';
import { Exercise } from './exercise.model';
import { ExerciseProvider } from 'src/tests/exercise.provider';
import { MaterialModule } from 'src/app/material.module';

fdescribe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;
  let service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesComponent ],
      imports: [
        CommonModule,
        MaterialModule,
        PresentationComponentsModule
      ],
      providers: [ ExercisesService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ExercisesService);
    spyOn(service, 'getAll').and.returnValue(of(ExerciseProvider.twoNotCompleted));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get exercises from a service', () => {
    component.ngOnInit();
    expect(service.getAll).toHaveBeenCalled();
  });

  it('should set current exercise as first', () => {
    component.ngOnInit();
    component.currentExercise$.subscribe(exercise => {
      expect(exercise).toEqual(jasmine.any(Exercise))
      expect(exercise).toEqual(ExerciseProvider.twoNotCompleted[0]);
    });
  });

  it('should set current exercise as second', () => {
    service.getAll.and.returnValue(of(ExerciseProvider.twoFirstCompleted));
    component.ngOnInit();
    component.currentExercise$.subscribe(exercise => {
      expect(exercise).toEqual(jasmine.any(Exercise))
      expect(exercise).toEqual(ExerciseProvider.twoNotCompleted[1]);
    });
  });
});
