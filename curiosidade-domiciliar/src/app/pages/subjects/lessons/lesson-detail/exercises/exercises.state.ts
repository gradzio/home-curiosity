import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Collection } from 'src/app/core/collection';
import { ExerciseModel } from './exercise.model';
import { Progress } from 'src/app/core/progress';
import { tap } from 'rxjs/operators';
import { ExercisesService } from './exercises.service';
import { debug } from 'util';
import { CompletedExercises } from '../../../subject.state';

export interface ExercisesStateInterface {
  exercises: Collection<ExerciseModel>;
  currentExercise?: ExerciseModel;
}

export class AnsweredCorrectly {
    static readonly type = '[Exercises Flow Page] Answered correctly'
      constructor(public lessonGuid: string) {};
}

export class GetExercises {
    static readonly type = '[Exercises Flow Page] Get exercises';
    constructor(public lessonGuid: string) {};
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
      tap(exercises => ctx.patchState({exercises}))
    );
  }

  @Action(AnsweredCorrectly)
  answeredCorrectly(ctx: StateContext<ExercisesStateInterface>, action: AnsweredCorrectly) {
    const exercises = ctx.getState().exercises;
    exercises.next();
    if (exercises.progress.isCompleted) {
        return ctx.dispatch(new CompletedExercises(action.lessonGuid));
    }
    return ctx.patchState({exercises});
  }
}
