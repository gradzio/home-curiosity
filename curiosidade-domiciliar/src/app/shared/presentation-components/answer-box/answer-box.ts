import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { Button } from 'protractor';

@Component({
  selector: 'app-answer-box',
  exportAs: 'answerBox',
  templateUrl: './answer-box.html',
  styleUrls: ['./answer-box.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'app-answer-box'}
})
export class AnswerBox implements OnInit {
  @Input()
  header: string;

  private _answerText: string;

  get isDisabled(): boolean {
    return this._answerText == null || this._answerText.trim().length === 0;
  };

  @Output()
  answerSubmitted: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSubmitAnswer() {
    this.answerSubmitted.emit(this._answerText);
  }

  onValueChange(value: string) {
      this._answerText = value;
  }
}
