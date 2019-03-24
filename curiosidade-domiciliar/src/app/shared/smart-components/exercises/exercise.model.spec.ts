import { Exercise } from "./exercise.model";

describe('ExerciseModel', () => {
    it('should create', () => {
        const exercise = new Exercise('guid', 'title', 'imageUrl');
        expect(exercise.guid).toEqual('guid');
        expect(exercise.title).toEqual('title');
        expect(exercise.imageUrl).toEqual('imageUrl');
    });

    it('should compare as false', () => {
        const exercise1 = new Exercise('guid1', 'title1', 'imageUrl1');
        const exercise2 = new Exercise('guid2', 'title2', 'imageUrl2');

        expect(exercise1.isEqual(exercise2)).toEqual(false);
    });

    it('should compare as true', () => {
        const exercise1 = new Exercise('guid1', 'title1', 'imageUrl1');
        const exercise2 = new Exercise('guid1', 'title1', 'imageUrl1');

        expect(exercise1.isEqual(exercise2)).toEqual(true);
    });
});