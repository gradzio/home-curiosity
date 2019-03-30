import { IconButtonInterface } from 'src/app/shared/presentation-components/icon-button/icon-button.interface';

export class LessonModel implements IconButtonInterface {
    private _name: string;
    private _icon: string;
    constructor(name: string, icon: string) {
        this._name = name;
        this._icon = icon;
    }

    get name(): string {
        return this._name;
    }

    get icon(): string {
        return this._icon;
    }
}