import { ExerciseModel } from './exercise.model';

describe('ExerciseModel', () => {
    it('should create', () => {
        const exercise = new ExerciseModel('guid', 'title', 'imageUrl');
        expect(exercise.guid).toEqual('guid');
        expect(exercise.title).toEqual('title');
        expect(exercise.imageUrl).toEqual('imageUrl');
        expect(exercise.choices.length).toEqual(0);
    });

    it('should create with choices', () => {
        const exercise = new ExerciseModel('guid', 'title', 'imageUrl', ['1', '2', '3']);
        expect(exercise.choices.length).toEqual(3);
        expect(exercise.choices[0]).toEqual('1');
        expect(exercise.choices[1]).toEqual('2');
        expect(exercise.choices[2]).toEqual('3');
    });

    it('should compare as false', () => {
        const exercise1 = new ExerciseModel('guid1', 'title1', 'imageUrl1');
        const exercise2 = new ExerciseModel('guid2', 'title2', 'imageUrl2');

        expect(exercise1.isEqual(exercise2)).toEqual(false);
    });

    it('should compare as true', () => {
        const exercise1 = new ExerciseModel('guid1', 'title1', 'imageUrl1');
        const exercise2 = new ExerciseModel('guid1', 'title1', 'imageUrl1');

        expect(exercise1.isEqual(exercise2)).toEqual(true);
    });


});
