import { ProgressStates, Progress } from './progress';

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
