import { ExerciseFactory } from './exercise.factory';
import { ExerciseModel } from './exercise.model';

describe('ExerciseFactory', () => {
    it('should make object', () => {
        const actual = ExerciseFactory.make({
            guid: 'guid1',
            question: 'question?',
            imageUrl: 'https://www.site.com/image.png'
        });
        expect(actual).toEqual(jasmine.any(ExerciseModel));
    });
});
