/* tslint:disable:no-feature-envy */
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Collection } from 'src/app/core/collection';
import { ExerciseModel } from './exercise.model';
import { ExercisesService } from './exercises.service';
import { CompletedExercises } from '../../../subject.state';
import { map } from 'rxjs/operators';

export interface ExercisesStateInterface {
  exercises: Collection<ExerciseModel>;
  currentExercise?: ExerciseModel;
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
      exercises: new Collection([])
  }
})
export class ExercisesState {
  constructor(private exerciseService: ExercisesService) {}

  @Selector()
  static exercises(state: ExercisesStateInterface) {
    return state.exercises;
  }

  @Action(GetExercises)
  getExercises(ctx: StateContext<ExercisesStateInterface>, action: GetExercises) {
    return this.exerciseService.getAll(action.lessonGuid).pipe(
      map(exercises => ctx.patchState({exercises}))
    );
  }

  @Action(AnsweredCorrectly)
  answeredCorrectly(ctx: StateContext<ExercisesStateInterface>, action: AnsweredCorrectly) {
    const exercises = ctx.getState().exercises;
    exercises.next();
    if (exercises.progress.isCompleted) {
        return ctx.dispatch(new CompletedExercises(action.lessonGuid, action.topicGuid));
    }
    return ctx.patchState({exercises});
  }
}