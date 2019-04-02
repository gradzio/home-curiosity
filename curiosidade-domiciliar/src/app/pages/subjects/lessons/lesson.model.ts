export class LessonModel {
    private _guid: string;
    private _name: string;
    private _icon: string;
    private _videoUrl: string;
    constructor(guid: string, name: string, icon: string, videoUrl: string) {
        this._guid = guid;
        this._name = name;
        this._icon = icon;
        this._videoUrl = videoUrl;
    }

    get guid(): string {
        return this._guid
    }

    get name(): string {
        return this._name;
    }

    get icon(): string {
        return this._icon;
    }

    get videoUrl(): string {
        return this._videoUrl;
    }
}