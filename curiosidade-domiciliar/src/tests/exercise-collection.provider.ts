import { Collection } from 'src/app/core/collection';
import { ExerciseModel } from 'src/app/pages/subjects/lessons/topics/exercises/exercise.model';

const choices = [
    {label: '<img src="/image1.jpg">', value: '1'},
    {label: '<img src="/image2.jpg">', value: '2'},
    {label: '<img src="/image3.jpg">', value: '3'}
];

export const ExerciseCollectionProvider = {
    two: new Collection([
        new ExerciseModel('guid1', 'title1', 'image1.jpg', 'RADIO'),
        new ExerciseModel('guid2', 'title2', 'image2.jpg', 'INPUT')
    ]),
    SINGLE_WITH_RADIO_CHOICES: new Collection<ExerciseModel>([new ExerciseModel('guid', 'title', 'image.jpg', 'RADIO', choices)]),
    SINGLE_WITH_INPUT: new Collection([new ExerciseModel('guid', 'title', 'image.jpg', 'INPUT')]),
    SINGLE_WITH_SEQUENCE: new Collection([new ExerciseModel('guid', 'title', '/image.jpg', 'SEQUENCE', choices)])
};
