import { Progress } from './progress';

export class Collection<T> {
    private _items: T[];
    private _progress: Progress;
    private _current: T;
    private _counter = 0;

    constructor(items) {
        this._items = items;
        this._progress = new Progress(items.length);
        this.current = this._items[this._progress.current - 1];
    }

    map(callback) {
        return this._items.map(callback);
    }

    find(callback) {
        return this._items.find(callback);
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
