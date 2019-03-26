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
}

export class Collection<T> {
    private _items: T[];
    private _progress: Progress;
    private _current: T;

    constructor(items) {
        this._items = items;
        this._progress = new Progress(items.length);
        this.current = this._items[this._progress.current - 1];
    }

    map(callback) {
        const arr = [];
        for (let i = 0; i < this._items.length; i++) {
            arr.push(callback(this._items[i], i, this._items));
        }
        return arr;
    }

    get length (): number {
        return this._items.length;
    }

    get current(): T {
        return this._items[this._progress.current - 1];
    }

    set current(next: T) {
        this._current = next;
    }

    next() {
        const nextItemIndex = this.progress.next();
        this.current = this._items[nextItemIndex - 1];
    }

    get progress(): Progress {
        return this._progress;
    }
}
