import { ExerciseFactory } from './exercise.factory';
import { ExerciseModel } from './exercise.model';

describe('ExerciseFactory', () => {
    it('should make object without choices', () => {
        const actual = ExerciseFactory.make({
            guid: 'guid1',
            content: 'content',
            type: 'type'
        });
        expect(actual).toEqual(jasmine.any(ExerciseModel));
    });

    it('should make object with choices', () => {
        const actual = ExerciseFactory.make({
            guid: 'guid1',
            content: 'content',
            type: 'type',
            choices: [{label: '1', value: '1'}, {label: '2', value: '2'}]
        });
        expect(actual).toEqual(jasmine.any(ExerciseModel));
        expect(actual.choices.length).toEqual(2);
    });
});
