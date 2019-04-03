import { ExerciseModel } from './exercise.model';

describe('ExerciseModel', () => {
    it('should create', () => {
        const exercise = new ExerciseModel('guid', 'title', 'imageUrl');
        expect(exercise.guid).toEqual('guid');
        expect(exercise.title).toEqual('title');
        expect(exercise.imageUrl).toEqual('imageUrl');
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
