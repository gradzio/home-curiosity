import { TimerService } from './timer.service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('TimerService', () => {
    let timerService;

    beforeEach(() => {
        timerService = new TimerService();
    });

    it('should init timer and unsubscribe on event', fakeAsync(() => {
        const emittedVals = [];
        const sub = timerService.getCountDown(5).subscribe((v) => {
            expect(v.total).toEqual(5);
            emittedVals.push(v.current);
        });
        tick(3000);
        expect(emittedVals).toEqual([5, 4, 3]);
        tick(3000);
        expect(emittedVals).toEqual([5, 4, 3, 2, 1, 0]);
        sub.unsubscribe();
    }));
});
