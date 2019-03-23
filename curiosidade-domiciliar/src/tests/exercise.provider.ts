import { Exercise } from 'src/app/shared/smart-components/exercises/exercise.model';

const exerciseCircles = new Exercise('guid1', 'How many circles?', 'https://www.pngkey.com/png/full/333-3337678_two-circles-white-circle-transparent-outside.png', false);
const exerciseBirds = new Exercise('guid2', 'How many birds?', 'http://worldartsme.com/images/7-birds-clipart-1.jpg', false);

const exerciseCirclesCompleted = Object.assign({isCompleted: true}, exerciseCircles);

export const ExerciseProvider = {
    twoNotCompleted: [
        exerciseCircles,
        exerciseBirds
    ],
    twoFirstCompleted: [
        exerciseCirclesCompleted,
        exerciseBirds
    ]
};