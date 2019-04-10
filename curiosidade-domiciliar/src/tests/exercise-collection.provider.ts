import { Collection } from 'src/app/core/collection';
import { ExerciseModel } from 'src/app/pages/subjects/lessons/topics/exercises/exercise.model';

export const ExerciseCollectionProvider = {
    two: new Collection([new ExerciseModel('guid1', 'title1', 'image1.jpg'), new ExerciseModel('guid2', 'title2', 'image2.jpg')])
};
