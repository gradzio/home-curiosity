import { Collection } from './collection';
import { ProgressStates } from './progress';
describe('Collection', () => {
    let collection;
    beforeEach(() => {
        collection = new Collection([1, 2, 3]);
    });
    it('should create', () => {
        expect(collection.progress.current).toEqual(1);
        expect(collection.progress.total).toEqual(3);
        expect(collection.progress.state).toEqual(ProgressStates.NOT_STARTED);
        expect(collection.length).toEqual(3);
    });

    it('should test main helper functions in a collection', () => {
        const actual = collection.map(item => item + 1);

        expect(actual).toEqual([2, 3, 4]);
        expect(actual.length).toEqual(3);
    });

    it('should get next', () => {
        collection.next();
        expect(collection.current).toEqual(2);
    });

    it('should find element', () => {
        expect(collection.find(item => item === 2)).toEqual(2);
    });

    it('should set right state', () => {
        expect(collection.progress.hasNext).toEqual(true);
        expect(collection.progress.isCompleted).toEqual(false);
        expect(collection.progress.state).toEqual(ProgressStates.NOT_STARTED);

        collection.next();

        expect(collection.progress.hasNext).toEqual(true);
        expect(collection.progress.isCompleted).toEqual(false);
        expect(collection.progress.state).toEqual(ProgressStates.IN_PROGRESS);

        collection.next();

        expect(collection.progress.hasNext).toEqual(true);
        expect(collection.progress.isCompleted).toEqual(false);
        expect(collection.progress.state).toEqual(ProgressStates.IN_PROGRESS);

        collection.next();

        expect(collection.progress.hasNext).toEqual(false);
        expect(collection.progress.isCompleted).toEqual(true);
        expect(collection.progress.state).toEqual(ProgressStates.COMPLETED);
    });
});
