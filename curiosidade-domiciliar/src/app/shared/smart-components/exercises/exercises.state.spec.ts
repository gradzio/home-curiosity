import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ExercisesState, AnsweredCorrectly, ExercisesExited, ExercisesRequested } from './exercises.state';
import { ExercisesService } from './exercises.service';
import { of } from 'rxjs';
import { ExerciseCollectionProvider } from 'src/tests/exercise-collection.provider';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Collection } from 'src/app/core/collection';
import { ExercisesStateProvider } from 'src/tests/exercises-state.provider';
import { LessonsService } from '../../../pages/subjects/lessons/lessons.service';
import { TimerService } from 'src/app/shared/services/timer.service';

describe('ExercisesState', () => {
  let store: Store;
  let exercisesService;
  let timerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ExercisesState]), HttpClientTestingModule],
      providers: [
        ExercisesService,
        LessonsService,
        TimerService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    exercisesService = TestBed.get(ExercisesService);
    spyOn(exercisesService, 'getAll').and.returnValue(of(ExerciseCollectionProvider.two));
    timerService = TestBed.get(TimerService);
    store.reset(ExercisesStateProvider.TWO);
  });

  it('should bind GetExercises', async(() => {
    const countDownFrom = 60;
    spyOn(timerService, 'getCountDown').and.returnValue(of({current: countDownFrom, total: countDownFrom}));
    store.dispatch(new ExercisesRequested('exerciseGuid1'));
    store.selectOnce(state => state.exercises.exercises).subscribe(exercises => {
      expect(exercisesService.getAll).toHaveBeenCalled();
      expect(exercises).toEqual(jasmine.any(Collection));
      expect(exercises.length).toEqual(2);
    });
  }));

  it('should handle AnsweredCorrectly', async(() => {
    store.dispatch(new AnsweredCorrectly());
    store.selectOnce(state => state.exercises).subscribe(state => {
      expect(state.exercises.current.guid).toEqual('guid1');
      expect(state.answeredCount).toEqual(1);
    });
  }));

  it('should set completed on timer up', async(() => {
    spyOn(timerService, 'getCountDown').and.returnValue(of({current: 0, total: 1}));
    store.reset(ExercisesStateProvider.COUNTDOWN_COMPLETED);
    store.dispatch(new ExercisesRequested('exerciseGuid1'));
  }));

  it('should clear state', () => {
    spyOn(timerService, 'getCountDown').and.returnValue(of(10));
    store.reset(ExercisesStateProvider.TWO);
    store.dispatch(new ExercisesRequested('exerciseGuid1'));
    store.dispatch(new ExercisesExited());

    store.selectOnce(state => state.exercises).subscribe(state => {
      expect(state.countDown).toBeUndefined();
      expect(state.answeredCount).toEqual(0);
    });
  });
});
