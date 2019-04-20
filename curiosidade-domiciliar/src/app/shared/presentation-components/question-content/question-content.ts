import { Component, OnInit, Input } from '@angular/core';
import { QuestionContentConfig } from './question-content.interface';

@Component({
  selector: 'app-question-content',
  templateUrl: './question-content.html'
})
export class QuestionContent {
    private _elements;
    private _config: QuestionContentConfig;

    @Input()
    set config(config: QuestionContentConfig) {
        this._config = config;
        this._elements = new Array(
            Math.floor(
                Math.random() * (this._config.max - this._config.min + 1)
            ) + this._config.min
        );
    }

    get elements() {
        return this._elements;
    }

    get gridColumns() {
        return this._config ? Math.ceil(Math.sqrt(this._config.max)) : 0;
    }
}
