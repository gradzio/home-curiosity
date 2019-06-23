/* tslint:disable:no-feature-envy */
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { LessonModel } from './lessons/lesson.model';
import { LessonsService } from './lessons/lessons.service';
import { map } from 'rxjs/operators';

export class GetLessons {
  static readonly type = '[Lessons List Page] Get lessons';
  constructor(public subject: string, public selectedLessonGuid?: string) {}
}

export class CompletedExercises {
  static readonly type = '[Exercise Flow Page] Completed exercises';
  constructor(public exerciseGuid: string) {}
}

export class CompletedTopics {
  static readonly type = '[Lesson Detail Page] Completed topics';
  constructor(public lessonGuid: string) {}
}

export class SelectLesson {
  static readonly type = '[Lesson Detail Page] Select lesson';
  constructor(public lesson: LessonModel) {}
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
          selectedLesson = lessons.find(l => l.guid === action.selectedLessonGuid);
        }
        return ctx.patchState({ lessons, selectedLesson });
      })
    );
  }

  @Action(SelectLesson)
  SelectLesson(ctx: StateContext<SubjectStateInterface>, action: SelectLesson) {
    ctx.patchState({selectedLesson: action.lesson});
  }

  @Action(CompletedExercises)
  completedExercises(ctx: StateContext<SubjectStateInterface>, action: CompletedExercises) {
    const { lessons, selectedLesson} = ctx.getState();
    const completedLessons = lessons.map(lesson => {
      if (lesson.guid === selectedLesson.guid) {
          lesson.topics.next();
          if (lesson.topics.progress.isCompleted) {
            ctx.dispatch(new CompletedTopics(selectedLesson.guid));
          }
      }
      return lesson;
    });
    ctx.patchState({lessons: completedLessons});
  }

  @Action(CompletedTopics)
  completedTopics(ctx: StateContext<SubjectStateInterface>, action: CompletedTopics) {
    const lessons = ctx.getState().lessons.map(lesson => {
      if (lesson.guid === action.lessonGuid) {
          lesson.complete();
      }
      return lesson;
    });
    ctx.patchState({lessons});
  }
}
