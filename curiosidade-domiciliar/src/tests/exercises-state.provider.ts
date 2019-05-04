import { Collection } from 'src/app/core/collection';
import { ExerciseCollectionProvider } from './exercise-collection.provider';

export const ExercisesStateProvider = {
    EMPTY: {
        exercises: {
            exercises: new Collection([]),
            currentExercise: null,
            answeredCount: 0,
            countDown: null,
            scope: {}
        }
    },
    TWO: {
        exercises: {
            exercises: ExerciseCollectionProvider.two,
            currentExercise: null,
            answeredCount: 0,
            countDown: { current: 60, total: 60 },
            scope: { lessonGuid: 'lessonGuid', topicGuid: 'topicGuid' }
        }
    },
    COUNTDOWN_COMPLETED: {
        exercises: {
            exercises: ExerciseCollectionProvider.two,
            currentExercise: ExerciseCollectionProvider.two.current,
            countDownProgress: {isCompleted: true},
            countDown: { current: 0, total: 1 },
            answeredCount: 5,
            scope: { lessonGuid: 'lessonGuid', topicGuid: 'topicGuid' }
        }
    }
};
