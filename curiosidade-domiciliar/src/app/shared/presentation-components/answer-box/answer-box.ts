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
  ElementRef,
  QueryList,
  ViewChildren,
  ChangeDetectorRef
} from '@angular/core';
import { MatRadioGroup, MatRadioButton } from '@angular/material';
import { Option } from './option.interface';
import { ExerciseModel } from 'src/app/shared/smart-components/exercises/exercise.model';
import { SequenceBuilder } from '../sequence-builder/sequence-builder';

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

  @ViewChild('answerInput') answerInput: ElementRef;
  @ViewChildren(MatRadioButton) radios: QueryList<MatRadioButton>;
  @ViewChild(SequenceBuilder) sequenceBuilder: SequenceBuilder;

  private _answerText: string;

  private _item;
  @Input()
  set item(item: ExerciseModel) {
    this._item = item;
    if (this.sequenceBuilder) {
      this.sequenceBuilder.choices = item.choices;
    }
  }
  get item() {
    return this._item;
  }

  @Output()
  answerSubmitted: EventEmitter<string> = new EventEmitter();

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  get isDisabled(): boolean {
    return this._answerText == null || this._answerText.trim().length === 0;
  }

  clearState() {
    this._answerText = null;
    if (this.answerInput) {
      this.answerInput.nativeElement.value = '';
    }
    if (this.radios) {
      this.radios.forEach(item => item.checked = false);
    }
    if (this.sequenceBuilder) {
      this.sequenceBuilder.reset();
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
