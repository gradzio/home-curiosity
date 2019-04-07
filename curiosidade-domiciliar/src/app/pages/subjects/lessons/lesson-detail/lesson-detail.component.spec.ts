import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDetailComponent } from './lesson-detail.component';
import { PresentationComponentsModule } from 'src/app/shared/presentation-components/presentation-components.module';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LessonModel } from '../lesson.model';
import { NgxsModule, Store } from '@ngxs/store';
import { SubjectState } from '../../subject.state';
import { ExercisesState } from './exercises/exercises.state';
import { ExercisesService } from './exercises/exercises.service';
import { LessonsService } from '../lessons.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LessonsProvider } from 'src/tests/lessons.provider';
import { By } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material.module';
import { SubjectStateProvider } from 'src/tests/subject-state.provider';

describe('LessonDetailComponent', () => {
  let component: LessonDetailComponent;
  let fixture: ComponentFixture<LessonDetailComponent>;
  let store;
  const activatedRoute = new ActivatedRoute();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonDetailComponent ],
      imports: [
        NgxsModule.forRoot([SubjectState, ExercisesState]),
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule,
        PresentationComponentsModule
      ],
      providers: [ExercisesService, LessonsService, {provide: ActivatedRoute, useValue: activatedRoute}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonDetailComponent);
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
