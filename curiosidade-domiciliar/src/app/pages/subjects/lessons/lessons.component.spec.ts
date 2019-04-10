import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsComponent } from './lessons.component';
import { ActivatedRoute } from '@angular/router';
import { LessonModel } from './lesson.model';
import { BehaviorSubject, of } from 'rxjs';
import { IconButton } from 'src/app/shared/presentation-components/icon-button/icon-button';
import { MaterialModule } from 'src/app/material.module';
import { PresentationComponentsModule } from 'src/app/shared/presentation-components/presentation-components.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LessonsProvider } from 'src/tests/lessons.provider';
import { NgxsModule, Store } from '@ngxs/store';
import { SubjectState } from '../subject.state';
import { ExercisesState } from './topics/exercises/exercises.state';
import { ExercisesService } from './topics/exercises/exercises.service';
import { LessonsService } from './lessons.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SubjectStateProvider } from 'src/tests/subject-state.provider';

describe('LessonsComponent', () => {
  let component: LessonsComponent;
  let fixture: ComponentFixture<LessonsComponent>;
  let store;
  const activatedRoute = new ActivatedRoute();
  activatedRoute.data = of({lessons: LessonsProvider.two});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonsComponent ],
      imports: [
        NgxsModule.forRoot([SubjectState, ExercisesState]),
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        PresentationComponentsModule
      ],
      providers: [ExercisesService, LessonsService, {provide: ActivatedRoute, useValue: activatedRoute}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    store.reset(SubjectStateProvider.TWO_LESSONS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get lessons', () => {
    component.iconButtonVMs$.subscribe(iconButtons => {
      expect(iconButtons.length).toEqual(2);
    }).unsubscribe();
  });
});
