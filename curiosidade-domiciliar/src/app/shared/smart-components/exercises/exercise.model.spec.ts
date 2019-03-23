import { Exercise } from "./exercise.model";

describe('ExerciseModel', () => {
    it('should create', () => {
        const exercise = new Exercise('guid', 'title', 'imageUrl', false);
        expect(exercise.guid).toEqual('guid');
        expect(exercise.title).toEqual('title');
        expect(exercise.imageUrl).toEqual('imageUrl');
        expect(exercise.isCompleted).toEqual(false);
    });

    it('should compare as false', () => {
        const exercise1 = new Exercise('guid1', 'title1', 'imageUrl1', true);
        const exercise2 = new Exercise('guid2', 'title2', 'imageUrl2', false);

        expect(exercise1.isEqual(exercise2)).toEqual(false);
    });

    it('should compare as true', () => {
        const exercise1 = new Exercise('guid1', 'title1', 'imageUrl1', true);
        const exercise2 = new Exercise('guid1', 'title1', 'imageUrl1', true);

        expect(exercise1.isEqual(exercise2)).toEqual(true);
    });

    it('should set isCompleted', () => {
        const exercise = new Exercise('guid', 'title', 'imageUrl', false);
        exercise.complete();

        expect(exercise.isCompleted).toEqual(true);
    });
});