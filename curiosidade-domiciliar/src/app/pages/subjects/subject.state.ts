import { State, Selector, Action, StateContext } from '@ngxs/store';
import { LessonModel } from './lessons/lesson.model';
import { LessonsService } from './lessons/lessons.service';
import { tap, catchError, finalize, map } from 'rxjs/operators';
import { Collection } from 'src/app/core/collection';
import { ExerciseModel } from './lessons/lesson-detail/exercises/exercise.model';
import { ExercisesService } from './lessons/lesson-detail/exercises/exercises.service';

export class GetLessons {
  static readonly type = '[Lessons List Page] Get lessons';
  constructor(public subject: string, public selectedLessonGuid?: string) {};
}

export class GetLesson {
  static readonly type = '[Lesson Detail Page] Get lesson';
  constructor(public lessonGuid: string) {};
}

export class CompletedExercises {
  static readonly type = '[Exercise Flow Page] Completed pages';
  constructor(public lessonGuid: string) {};
}

export interface SubjectStateInterface {
  subject: { name: string; };
  lessons: LessonModel[];
  selectedLesson?: LessonModel;
}

@State<SubjectStateInterface>({
  name: 'subject',
  defaults: {
      subject: {
        name: 'math'
      },
      lessons: [],
      selectedLesson: null
  }
})
export class SubjectState {
  constructor(private lessonService: LessonsService) {}

  @Selector()
  static lessons(state: SubjectStateInterface) {
    return state.lessons;
  }

  @Selector()
  static selectedLesson(state: SubjectStateInterface) {
    return state.selectedLesson;
  }

  @Action(GetLessons)
  getLessons(ctx: StateContext<SubjectStateInterface>, action: GetLessons) {
    return this.lessonService.getAll(action.subject).pipe(
      map(lessons => {
        let selectedLesson;
        if (action.selectedLessonGuid) {
          selectedLesson = lessons.find(lesson => lesson.guid === action.selectedLessonGuid);
        }
        return ctx.patchState({ lessons, selectedLesson })
      })
    );
  }

  @Action(GetLesson)
  getLesson(ctx: StateContext<SubjectStateInterface>, action: GetLesson) {
    return this.lessonService.getOne(action.lessonGuid).pipe(
      tap(selectedLesson => ctx.patchState({ selectedLesson }))
    );
  }

  @Action(CompletedExercises)
  completedExercises(ctx: StateContext<SubjectStateInterface>, action: CompletedExercises) {
    const lessons = ctx.getState().lessons.map(lesson => {
      if (lesson.guid === action.lessonGuid) {
          lesson.complete();
      }
      return lesson;
    });
    ctx.patchState({lessons});
  }
}
