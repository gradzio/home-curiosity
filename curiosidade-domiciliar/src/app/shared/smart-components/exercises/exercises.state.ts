/* tslint:disable:no-feature-envy */
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Collection } from 'src/app/core/collection';
import { ExerciseModel } from './exercise.model';
import { ExercisesService } from './exercises.service';
import { CompletedExercises } from '../../../pages/subjects/subject.state';
import { map } from 'rxjs/operators';
import { TimerService, CountDownInterface } from 'src/app/shared/services/timer.service';

export interface ExercisesStateInterface {
  exercises: Collection<ExerciseModel>;
  currentExercise?: ExerciseModel;
  countDown?: CountDownInterface;
  answeredCount: number;
}

export interface ScopeInterface {
  subject: string;
  lessonGuid: string;
  topicGuid: string;
}

export class ExercisesExited {
  static readonly type = '[Exercises Flow Page] Exited';
}

export class AnsweredCorrectly {
  static readonly type = '[Exercises Flow Page] Answered correctly';
  constructor(public lessonGuid: string, public topicGuid: string) {}
}

export class ExercisesRequested {
  static readonly type = '[Exercises Flow Page] Get exercises';
  constructor(public exerciseGuid: string) {}
}

export class CountExercisesRequested {
  static readonly type = '[Exercises Flow Page] Get count exercises'
}

@State<ExercisesStateInterface>({
  name: 'exercises',
  defaults: {
      exercises: new Collection([]),
      answeredCount: 0
  }
})
export class ExercisesState {
  private _countDownTotal = 20;
  private _subscriptions = {};
  constructor(private _exerciseService: ExercisesService, private _timerService: TimerService) {}

  @Selector()
  static exercises(state: ExercisesStateInterface) {
    return state.exercises;
  }

  @Selector()
  static answeredCount(state: ExercisesStateInterface) {
    return state.answeredCount;
  }

  @Selector()
  static countDown(state: ExercisesStateInterface) {
    return state.countDown;
  }

  @Selector()
  static currentExercise(state: ExercisesStateInterface) {
    return state.currentExercise;
  }

  @Action(ExercisesRequested)
  getExercises(ctx: StateContext<ExercisesStateInterface>, action: ExercisesRequested) {
    return this._exerciseService.getAll(action.exerciseGuid).pipe(
      map(exercises => ctx.patchState({exercises, currentExercise: exercises.current}))
    );
  }

  @Action(AnsweredCorrectly)
  answeredCorrectly(ctx: StateContext<ExercisesStateInterface>, action: AnsweredCorrectly) {
    const { exercises, answeredCount } = ctx.getState();
    const currentExercise = exercises.current.generate().next().value;
    return ctx.patchState({
      currentExercise,
      answeredCount: answeredCount + 1,
      exercises
    });
  }

  @Action(ExercisesRequested)
  getCountDown(ctx: StateContext<ExercisesStateInterface>, action: ExercisesRequested) {
    this._subscriptions['getCountDown'] = this._timerService.getCountDown(this._countDownTotal)
    .pipe(
      map(countDown => {
        ctx.patchState({countDown});
        if (countDown.current === 0) {
          ctx.dispatch(new CompletedExercises(action.exerciseGuid));
        }
      }),
    ).subscribe();
  }
  

  @Action(ExercisesExited)
  clearState(ctx: StateContext<ExercisesStateInterface>, action: ExercisesExited) {
    Object.keys(this._subscriptions).forEach(key => this._subscriptions[key].unsubscribe());
    ctx.patchState({countDown: undefined, answeredCount: 0});
  }
}
