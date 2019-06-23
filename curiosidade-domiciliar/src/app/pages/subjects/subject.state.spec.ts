import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LessonsProvider } from 'src/tests/lessons.provider';
import { SubjectStateProvider } from 'src/tests/subject-state.provider';
import { GetLessons, SubjectState, CompletedExercises, SelectLesson, CompletedTopics } from './subject.state';
import { ExercisesService } from '../../shared/smart-components/exercises/exercises.service';
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
    store.reset(SubjectStateProvider.TWO_LESSONS_FIRST_SELECTED);
  });

  it('should bind GetLessons', async(() => {
    spyOn(lessonsService, 'getAll').and.returnValue(of(LessonsProvider.two));
    store.dispatch(new GetLessons('subject'));
    store.selectOnce(state => state.subject).subscribe(subject => {
      expect(lessonsService.getAll).toHaveBeenCalledWith('subject');
      expect(subject.lessons.length).toEqual(2);
    }).unsubscribe();
  }));

  it('should bind GetLessons with pre select lesson', async(() => {
    spyOn(lessonsService, 'getAll').and.returnValue(of(LessonsProvider.two));
    store.dispatch(new GetLessons('subject', 'guid1'));
    store.selectOnce(state => state.subject).subscribe(subject => {
      expect(lessonsService.getAll).toHaveBeenCalledWith('subject');
      expect(subject.lessons.length).toEqual(2);
      expect(subject.selectedLesson.guid).toEqual('guid1');
    }).unsubscribe();
  }));

  it('should bind SelectLesson', async(() => {
    store.dispatch(new SelectLesson(LessonsProvider.two[0]));
    store.selectOnce(state => state.subject).subscribe(subject => {
      expect(subject.selectedLesson.guid).toEqual('guid1');
    }).unsubscribe();
  }));

  it('should bind CompletedExercises', async(() => {
    store.dispatch(new CompletedExercises('exerciseGuid1'));
    store.selectOnce(state => state.subject).subscribe(subject => {
      const lesson = subject.lessons.find(l => l.guid === 'guid1');
      expect(lesson.topics.progress.current).toEqual(2);
    }).unsubscribe();
  }));

  it('it calls CompletedExercises and CompletedTopics', async(() => {
    store.dispatch(new CompletedExercises('exerciseGuid1'));
    store.dispatch(new CompletedExercises('exerciseGuid2'));
    store.selectOnce(state => state.subject).subscribe(subject => {
      const lesson = subject.lessons.find(l => l.guid === 'guid1');
      expect(lesson.topics.progress.isCompleted).toEqual(true);
    }).unsubscribe();
  }));

  it('it binds CompletedTopics', async(() => {
    store.dispatch(new CompletedTopics('guid1'));
    store.selectOnce(state => state.subject).subscribe(subject => {
      const lesson = subject.lessons.find(l => l.guid === 'guid1');
      expect(lesson.isCompleted).toEqual(true);
    }).unsubscribe();
  }));
});
