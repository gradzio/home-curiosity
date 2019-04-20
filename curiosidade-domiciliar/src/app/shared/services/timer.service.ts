import { Subject, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface CountDownInterface {
    current: number;
    total: number;
}

@Injectable()
export class TimerService {
    getCountDown(from: number) {
        return interval(1000)
        .pipe(
            take(from + 1),
            map( i => ({current: from - i, total: from}))
        );
    }
}
