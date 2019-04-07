import { Collection } from 'src/app/core/collection';
import { ExerciseCollectionProvider } from './exercise-collection.provider';

export const ExercisesStateProvider = {
    EMPTY: {
        exercises: {
            exercises: new Collection([]),
            currentExercise: null
        }
    },
    TWO: {
        exercises: {
            exercises: ExerciseCollectionProvider.two,
            currentExercise: null
        }
    }
};
