import { LessonsComponent } from './lessons/lessons.component';
import { TopicsComponent } from './lessons/lesson-detail/topics.component';
import { TopicsResolver } from './lessons/lesson-detail/topics.resolver';
import { ExercisesComponent } from './lessons/lesson-detail/exercises/exercises.component';
import { ExercisesResolver } from './lessons/lesson-detail/exercises/exercises.resolver';
import { LessonsResolver } from './lessons/lessons.resolver';

export const SUBJECT_ROUTES = {
    path: 'subjects/:subject',
    children: [
        {
            path: '',
            component: LessonsComponent,
            resolve: {
                lessons: LessonsResolver
            }
        },
        {
            path: 'lessons/:lessonGuid',
            component: TopicsComponent,
            resolve: {
                lesson: TopicsResolver
            }
        },
        {
            path: 'lessons/:lessonGuid/topics/:topicGuid/exercises',
            component: ExercisesComponent,
            resolve: {
                exercises: ExercisesResolver
            }
        }
    ]
  };
