import { Collection } from 'src/app/core/collection';
import { ExerciseCollectionProvider } from './exercise-collection.provider';

export const ExercisesStateProvider = {
    EMPTY: {
        exercises: {
            exercises: new Collection([]),
            currentExercise: null,
            countDown: null,
            scope: {}
        }
    },
    TWO: {
        exercises: {
            exercises: ExerciseCollectionProvider.two,
            currentExercise: null,
            countDown: { current: 60, total: 60 },
            scope: { lessonGuid: 'lessonGuid', topicGuid: 'topicGuid' }
        }
    },
    COUNTDOWN_COMPLETED: {
        exercises: {
            exercises: ExerciseCollectionProvider.two,
            currentExercise: null,
            countDown: { current: 0, total: 1 },
            scope: { lessonGuid: 'lessonGuid', topicGuid: 'topicGuid' }
        }
    }
};
