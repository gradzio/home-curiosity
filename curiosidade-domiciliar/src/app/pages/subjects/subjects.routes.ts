import { LessonsComponent } from './lessons/lessons.component';
import { TopicsComponent } from './lessons/topics/topics.component';
import { TopicsResolver } from './lessons/topics/topics.resolver';
import { ExercisesComponent } from '../../shared/smart-components/exercises/exercises.component';
import { ExercisesResolver } from '../../shared/smart-components/exercises/exercises.resolver';
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
