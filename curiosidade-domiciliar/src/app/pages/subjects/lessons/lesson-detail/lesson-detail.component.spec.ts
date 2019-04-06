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

describe('LessonDetailComponent', () => {
  let component: LessonDetailComponent;
  let fixture: ComponentFixture<LessonDetailComponent>;
  let store;
  const activatedRoute = new ActivatedRoute();
  activatedRoute.data = of({lesson: new LessonModel('guid', 'name', 'icon', 'videoUrl')});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonDetailComponent ],
      imports: [NgxsModule.forRoot([SubjectState, ExercisesState]), HttpClientTestingModule, RouterTestingModule, PresentationComponentsModule],
      providers: [ExercisesService, LessonsService, {provide: ActivatedRoute, useValue: activatedRoute}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    store.reset({
      subject: {
        selectedLesson: LessonsProvider.two[0]
      }
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
