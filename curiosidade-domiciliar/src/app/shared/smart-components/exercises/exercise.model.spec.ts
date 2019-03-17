import { Exercise } from "./exercise.model";

describe('ExerciseModel', () => {
    it('should create', () => {
        const exercise = new Exercise('guid', 'title', 'imageUrl', false);
        expect(exercise.guid).toEqual('guid');
        expect(exercise.title).toEqual('title');
        expect(exercise.imageUrl).toEqual('imageUrl');
        expect(exercise.isCompleted).toEqual(false);
    });
});