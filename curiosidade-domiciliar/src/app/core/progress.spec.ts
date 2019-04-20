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
    });

    it('should change on next', () => {
        progress.next();

        expect(progress.current).toEqual(2);
        expect(progress.total).toEqual(2);
        expect(progress.state).toEqual(ProgressStates.IN_PROGRESS);

        progress.next();

        expect(progress.current).toEqual(2);
        expect(progress.total).toEqual(2);
        expect(progress.state).toEqual(ProgressStates.COMPLETED);
    });

    it('should make ProgressBarInterface', () => {
        expect(progress.makeProgressBarInterface()).toEqual({percentage: 0, label: `1 / 2`});
        progress.next();
        expect(progress.makeProgressBarInterface()).toEqual({percentage: 50, label: `2 / 2`});
        progress.next();
        expect(progress.makeProgressBarInterface()).toEqual({percentage: 100, label: `2 / 2`});
    });
});
