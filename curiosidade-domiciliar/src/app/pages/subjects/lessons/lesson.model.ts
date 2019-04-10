import { IconButtonInterface } from 'src/app/shared/presentation-components/icon-button/icon-button.interface';
import { TopicModel } from './topics/topic.model';
import { Collection } from 'src/app/core/collection';
import { ResourceCardInterface } from 'src/app/shared/presentation-components/video-card/video-card.interface';

export class LessonModel {
    private _topics: Collection<TopicModel>;
    constructor(private _guid: string, private _name: string, private _icon: string, private _isCompleted = false) { }

    get guid(): string {
        return this._guid;
    }

    get name(): string {
        return this._name;
    }

    get icon(): string {
        return this._icon;
    }

    get isCompleted(): boolean {
        return this._isCompleted;
    }

    set topics(topics: Collection<TopicModel>) {
        this._topics = topics;
    }

    get topics(): Collection<TopicModel> {
        return this._topics;
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
