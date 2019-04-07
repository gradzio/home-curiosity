import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LessonsProvider } from 'src/tests/lessons.provider';
import { SubjectStateProvider } from 'src/tests/subject-state.provider';
import { GetLessons, SubjectState, CompletedExercises, SelectLesson } from './subject.state';
import { ExercisesService } from './lessons/lesson-detail/exercises/exercises.service';
import { LessonsService } from './lessons/lessons.service';

describe('SubjectState', () => {
  let store: Store;
  let lessonsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SubjectState]), HttpClientTestingModule],
      providers: [ExercisesService, LessonsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    lessonsService = TestBed.get(LessonsService);
    store.reset(SubjectStateProvider.TWO_LESSONS);
  });

  it('it binds GetLessons', async(() => {
    spyOn(lessonsService, 'getAll').and.returnValue(of(LessonsProvider.two));
    store.dispatch(new GetLessons('subject'));
    store.selectOnce(state => state.subject).subscribe(subject => {
      expect(lessonsService.getAll).toHaveBeenCalledWith('subject');
      expect(subject.lessons.length).toEqual(2);
    });
  }));

  it('it binds GetLessons with pre select lesson', async(() => {
    spyOn(lessonsService, 'getAll').and.returnValue(of(LessonsProvider.two));
    store.dispatch(new GetLessons('subject', 'guid1'));
    store.selectOnce(state => state.subject).subscribe(subject => {
      expect(lessonsService.getAll).toHaveBeenCalledWith('subject');
      expect(subject.lessons.length).toEqual(2);
      expect(subject.selectedLesson.guid).toEqual('guid1');
    });
  }));

  it('it binds SelectLesson', async(() => {
    store.dispatch(new SelectLesson(LessonsProvider.two[0]));
    store.selectOnce(state => state.subject).subscribe(subject => {
      expect(subject.selectedLesson.guid).toEqual('guid1');
    });
  }));

  it('it binds CompletedExercises', async(() => {
    store.dispatch(new CompletedExercises('guid1'));
    store.selectOnce(state => state.subject).subscribe(subject => {
      const completedLesson = subject.lessons.find(lesson => lesson.isCompleted === true);
      expect(completedLesson.guid).toEqual('guid1');
    });
  }));
});
