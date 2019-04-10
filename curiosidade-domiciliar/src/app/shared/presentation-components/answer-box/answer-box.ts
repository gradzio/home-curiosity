import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
  HostBinding,
  ViewChild,
  ElementRef
} from '@angular/core';
import { MatRadioGroup } from '@angular/material';

@Component({
  selector: 'app-answer-box',
  exportAs: 'answerBox',
  templateUrl: './answer-box.html',
  styleUrls: ['./answer-box.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerBox implements OnInit {
  @HostBinding('class') classes = 'app-answer-box';
  @Input()
  header: string;

  @Input()
  choices?: string[];

  @ViewChild('answerInput') answerInput: ElementRef;
  @ViewChild('answerRadioGroup') answerRadioGroup: MatRadioGroup;

  private _answerText: string;

  get isDisabled(): boolean {
    return this._answerText == null || this._answerText.trim().length === 0;
  }

  @Output()
  answerSubmitted: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  clearState() {
    this._answerText = null;
    if (this.answerInput) {
      this.answerInput.nativeElement.value = '';
    }
    if (this.answerRadioGroup) {
      this.answerRadioGroup.value = null;
    }
  }

  onSubmitAnswer() {
    this.answerSubmitted.emit(this._answerText);
    this.clearState();
  }

  onValueChange(value: string) {
      this._answerText = value;
  }
}
