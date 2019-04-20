import { ProgressBarInterface } from '../shared/presentation-components/progress-bar/progress-bar.interface';

export enum ProgressStates {
    NOT_STARTED,
    IN_PROGRESS,
    COMPLETED
}

export class Progress {
    private _total: number;
    private _current = 1;
    private _state = ProgressStates.NOT_STARTED;

    constructor(total: number) {
        this._total = total;
    }

    get total(): number {
        return this._total;
    }

    next(): number {
        if (this._current === this._total) {
            this._state = ProgressStates.COMPLETED;
        } else {
            this._current = Math.min(this._total, this._current + 1);
            this._state = ProgressStates.IN_PROGRESS;
        }
        return this._current;
    }

    get isCompleted(): boolean {
        return this._state === ProgressStates.COMPLETED;
    }

    get hasNext(): boolean {
        return this._state !== ProgressStates.COMPLETED;
    }

    get current(): number {
        return this._current;
    }

    get state(): number {
        return this._state;
    }

    makeProgressBarInterface(): ProgressBarInterface {
        let percentage = 100;
        if (this._state !== ProgressStates.COMPLETED) {
            percentage = Math.floor((this._current - 1) / this._total * 100);
        }

        return {
            percentage,
            label: `${this._current} / ${this._total}`
        };
    }
}
