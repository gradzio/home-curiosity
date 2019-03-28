import { ProgressStates, Collection, Progress } from './collection';
describe('Progress', () => {
    let progress;
    beforeEach(() => {
        progress = new Progress(2);
    });

    it('should set right defaults', () => {
        expect(progress.current).toEqual(1);
        expect(progress.total).toEqual(2);
        expect(progress.state).toEqual(ProgressStates.NOT_STARTED);
        expect(progress.percentage).toEqual(0);
    });

    it('should change on next', () => {
        progress.next();

        expect(progress.current).toEqual(2);
        expect(progress.total).toEqual(2);
        expect(progress.state).toEqual(ProgressStates.IN_PROGRESS);
        expect(progress.percentage).toEqual(50);

        progress.next();

        expect(progress.current).toEqual(2);
        expect(progress.total).toEqual(2);
        expect(progress.state).toEqual(ProgressStates.COMPLETED);
        expect(progress.percentage).toEqual(100);
    });
});
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
