import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-sequence-builder',
  templateUrl: './sequence-builder.html',
  styleUrls: ['./sequence-builder.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SequenceBuilder implements OnInit {

  private _choices;
  @Input()
  set choices(choices) {
    this._choices = choices;
    this._changeDetectorRef.detectChanges();
  }
  get choices() {
    return this._choices;
  }

  @Input()
  maxItems = 5;

  @Output()
  change: EventEmitter<string> = new EventEmitter();

  private _sequence = [];

  get sequence() {
    return this._sequence;
  }

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  public reset() {
    this._sequence = [];
  }

  onItemSelected(item) {
    if (this.maxItems > this._sequence.length) {
      this._sequence.push(item);
      this._changeDetectorRef.detectChanges();
      this.change.emit(this._sequence.map(i => i.value).join(','));
    }
  }

  onItemCreatedClicked(index) {
    this._sequence.splice(index, 1);
    this._changeDetectorRef.detectChanges();
    this.change.emit(this._sequence.map(i => i.value).join(','));
  }
}
