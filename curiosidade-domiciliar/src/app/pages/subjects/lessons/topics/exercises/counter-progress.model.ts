import { ProgressBarInterface } from 'src/app/shared/presentation-components/progress-bar/progress-bar.interface';

export class CounterProgressModel implements ProgressBarInterface {
    constructor(private _current: number = null, private _total: number = null) {}

    get percentage(): number {
        if (this._current === null && this._total === null) {
            return 0;
        }
        return Math.floor((this._total - this._current) / this._total * 100);
    }

    get label(): string {
        return this._current !== null ? `${this._current}` : '';
    }

    get isCompleted(): boolean {
        return this._current !== null && this._total !== null && this._current === 0;
    }
}
