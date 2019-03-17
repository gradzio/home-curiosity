
export class Exercise {
    private _guid: string;
    private _title: string;
    private _imageUrl: string;
    private _isCompleted: boolean;
    constructor(guid: string, title: string, imageUrl: string, isCompleted: boolean) {
        this._guid = guid;
        this._title = title;
        this._imageUrl = imageUrl;
        this._isCompleted = isCompleted;
    }

    get guid(): string {
        return this._guid;
    }

    get title(): string {
        return this._title;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    get isCompleted(): boolean {
        return this._isCompleted;
    }
}