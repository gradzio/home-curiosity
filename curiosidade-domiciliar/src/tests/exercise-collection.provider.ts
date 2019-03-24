import { Collection } from 'src/app/core/collection';
import { Exercise } from 'src/app/shared/smart-components/exercises/exercise.model';

export const ExerciseCollectionProvider = {
    two: new Collection([new Exercise('guid1', 'title1', 'image1.jpg'), new Exercise('guid2', 'title2', 'image2.jpg')])
}