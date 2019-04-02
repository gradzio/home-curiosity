import { LessonsComponent } from './lessons/lessons.component';
import { LessonsResolver } from './lessons/lessons.resolver';
import { LessonDetailComponent } from './lessons/lesson-detail/lesson-detail.component';
import { LessonsDetailResolver } from './lessons/lesson-detail/lesson-detail.resolver';
import { ExercisesComponent } from './lessons/lesson-detail/exercises/exercises.component';
import { ExercisesResolver } from './lessons/lesson-detail/exercises/exercises.resolver';

export const SUBJECT_ROUTES = [
    {
        path: '',
        component: LessonsComponent,
        resolve: {
        lessons: LessonsResolver
        }
    },
    {
        path: 'lessons/:lessonGuid',
        component: LessonDetailComponent,
        resolve: {
        lesson: LessonsDetailResolver
        }
    },
    {
        path: 'lessons/:lessonGuid/exercises',
        component: ExercisesComponent,
        resolve: {
        exercises: ExercisesResolver
        }
    }
];