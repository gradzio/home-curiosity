import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ExercisesState, GetExercises, AnsweredCorrectly } from './exercises.state';
import { ExercisesService } from './exercises.service';
import { of } from 'rxjs';
import { ExerciseCollectionProvider } from 'src/tests/exercise-collection.provider';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Collection } from 'src/app/core/collection';
import { ExercisesStateProvider } from 'src/tests/exercises-state.provider';
import { SubjectState } from '../../../subject.state';
import { LessonsService } from '../../lessons.service';
import { LessonsProvider } from 'src/tests/lessons.provider';

describe('ExercisesState', () => {
  let store: Store;
  let exercisesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ExercisesState]), HttpClientTestingModule],
      providers: [ExercisesService, LessonsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    exercisesService = TestBed.get(ExercisesService);
    store.reset(ExercisesStateProvider.TWO);
  });

  it('it binds GetExercises', async(() => {
    spyOn(exercisesService, 'getAll').and.returnValue(of(ExerciseCollectionProvider.two));
    store.dispatch(new GetExercises('lessonGuid'));
    store.selectOnce(state => state.exercises.exercises).subscribe(exercises => {
      expect(exercisesService.getAll).toHaveBeenCalled();
      expect(exercises).toEqual(jasmine.any(Collection));
      expect(exercises.length).toEqual(2);
    });
  }));

  it('it handles AnsweredCorrectly', async(() => {
    store.dispatch(new AnsweredCorrectly('lessonGuid'));
    store.selectOnce(state => state.exercises.exercises).subscribe(exercises => {
      expect(exercises.progress.current).toEqual(2);
      expect(exercises.current.guid).toEqual('guid2');
    });
  }));

  it('it should set completed AnsweredCorrectly', async(() => {
    store.dispatch(new AnsweredCorrectly('guid1'));
    store.dispatch(new AnsweredCorrectly('guid1'));
  }));
});
