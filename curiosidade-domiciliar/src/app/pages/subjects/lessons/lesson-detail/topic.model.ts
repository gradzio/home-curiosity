import { DomSanitizer } from '@angular/platform-browser';
import { ResourceCardInterface } from 'src/app/shared/presentation-components/video-card/video-card.interface';

export class TopicModel {
    constructor(private _guid: string, private _name: string, private _videoUrl: string, private _isCompleted = false) {}

    get guid(): string {
        return this._guid;
    }

    get name(): string {
        return this._name;
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

    makeVideoCardViewModel(lessonGuid: string, sanitizer: DomSanitizer): ResourceCardInterface {
        return {
            title: this._name,
            resourceUrl: sanitizer.bypassSecurityTrustResourceUrl(this._videoUrl),
            navigation: {
              link: `/subjects/math/lessons/${lessonGuid}/topics/${this._guid}/exercises`,
              text: 'Practicar'
            }
          };
    }
}
