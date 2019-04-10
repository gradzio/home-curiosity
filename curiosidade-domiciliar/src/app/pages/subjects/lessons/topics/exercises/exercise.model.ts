
export class ExerciseModel {
    private _guid: string;
    private _title: string;
    private _imageUrl: string;
    constructor(guid: string, title: string, imageUrl: string) {
        this._guid = guid;
        this._title = title;
        this._imageUrl = imageUrl;
    }

    isEqual(exercise: ExerciseModel): boolean {
        return this._guid === exercise.guid
            && this._title === exercise.title
            && this._imageUrl === exercise.imageUrl;
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
}
