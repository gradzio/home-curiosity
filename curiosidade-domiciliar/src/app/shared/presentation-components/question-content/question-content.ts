import { Component, OnInit, Input } from '@angular/core';
import { QuestionContentConfig } from './question-content.interface';

@Component({
  selector: 'app-question-content',
  templateUrl: './question-content.html',
  styleUrls: ['question-content.scss']
})
export class QuestionContent {
    private _elements;
    private _config: QuestionContentConfig;
    private _template;

    @Input()
    set config(config: QuestionContentConfig) {
        this._config = config;
        this._elements = new Array(
            this._getRandomNumber(this._config.min, this._config.max)
        );
        if (this._config.data) {
            this._template = this._config.data[this._getRandomNumber(0, this._config.data.length - 1)].label;
        }
    }

    private _getRandomNumber(min, max) {
        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min
    }

    get template() {
        return this._template;
    }

    get elements() {
        return this._elements;
    }

    get gridColumns() {
        return this._config ? Math.ceil(Math.sqrt(this._config.max)) : 0;
    }
}
