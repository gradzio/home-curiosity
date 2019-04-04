import { IconButtonInterface } from 'src/app/shared/presentation-components/icon-button/icon-button.interface';

export class LessonModel {
    private _guid: string;
    private _name: string;
    private _icon: string;
    private _videoUrl: string;
    private _isCompleted: boolean;
    constructor(guid: string, name: string, icon: string, videoUrl: string, isCompleted = false) {
        this._guid = guid;
        this._name = name;
        this._icon = icon;
        this._videoUrl = videoUrl;
        this._isCompleted = isCompleted;
    }

    get guid(): string {
        return this._guid;
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

    get isCompleted(): boolean {
        return this._isCompleted;
    }

    complete() {
        this._isCompleted = true;
    }

    makeIconButtonViewModel(): IconButtonInterface {
    return {
            name: this._name,
            icon: this._icon,
            navigationLink: `/subjects/math/lessons/${this._guid}`,
            isDisabled: this._isCompleted
        };
    }
}
