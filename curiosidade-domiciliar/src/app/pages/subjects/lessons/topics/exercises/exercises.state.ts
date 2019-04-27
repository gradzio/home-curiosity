/* tslint:disable:no-feature-envy */
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Collection } from 'src/app/core/collection';
import { ExerciseModel } from './exercise.model';
import { ExercisesService } from './exercises.service';
import { CompletedExercises } from '../../../subject.state';
import { map } from 'rxjs/operators';
import { TimerService, CountDownInterface } from 'src/app/shared/services/timer.service';
import { STEP_STATE } from '@angular/cdk/stepper';

export interface ExercisesStateInterface {
  exercises: Collection<ExerciseModel>;
  currentExercise?: ExerciseModel;
  countDown?: CountDownInterface;
  scope: {
    lessonGuid?: string,
    topicGuid?: string
  };
}

export class GetCountDown {
  static readonly type = '[Exercises Flow Page] Get Count Down';
  constructor(public total: number) {}
}

export class ExercisesExited {
  static readonly type = '[Exercises Flow Page] Exited';
}

export class AnsweredCorrectly {
  static readonly type = '[Exercises Flow Page] Answered correctly';
  constructor(public lessonGuid: string, public topicGuid: string) {}
}

export class GetExercises {
  static readonly type = '[Exercises Flow Page] Get exercises';
  constructor(public lessonGuid: string) {}
}

@State<ExercisesStateInterface>({
  name: 'exercises',
  defaults: {
      exercises: new Collection([]),
      scope: {}
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
  static countDown(state: ExercisesStateInterface) {
    return state.countDown;
  }

  @Selector()
  static currentExercise(state: ExercisesStateInterface) {
    return state.currentExercise;
  }

  @Action(GetExercises)
  getExercises(ctx: StateContext<ExercisesStateInterface>, action: GetExercises) {
    ctx.dispatch(new GetCountDown(this._countDownTotal));
    return this._exerciseService.getAll(action.lessonGuid).pipe(
      map(exercises => ctx.patchState({exercises, currentExercise: exercises.current}))
    );
  }

  @Action(AnsweredCorrectly)
  answeredCorrectly(ctx: StateContext<ExercisesStateInterface>, action: AnsweredCorrectly) {
    const { exercises } = ctx.getState();
    const currentExercise = exercises.current.generate().next().value;
    return ctx.patchState({currentExercise, exercises, scope: {lessonGuid: action.lessonGuid, topicGuid: action.topicGuid}});
  }

  @Action(GetCountDown)
  getCountDown(ctx: StateContext<ExercisesStateInterface>, action: GetCountDown) {
    this._subscriptions['getCountDown'] = this._timerService.getCountDown(action.total)
    .pipe(
      map(countDown => {
        ctx.patchState({countDown});
        if (countDown.current === 0) {
          const { scope } = ctx.getState();
          ctx.dispatch(new CompletedExercises(scope.lessonGuid, scope.topicGuid));
        }
      }),
    ).subscribe();
  }

  @Action(ExercisesExited)
  stopCountDown(ctx: StateContext<ExercisesStateInterface>, action: ExercisesExited) {
    if (Object.keys(this._subscriptions).includes('getCountDown')) {
      this._subscriptions['getCountDown'].unsubscribe();
    }
    ctx.patchState({countDown: undefined});
  }
}
