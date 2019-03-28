import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Progress } from 'src/app/core/collection';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.html',
  styleUrls: ['./progress-bar.scss']
})
export class ProgressBar implements OnInit {
  @HostBinding('class') classes = 'app-progress-bar';
  @Input()
  public progress: Progress;
  // get progress(): Progress { return this._progress; }
  // set bufferValue(p: Progress) { this._progress = p; }
  // private _progress: Progress;

  constructor() { }

  ngOnInit() {
  }

}
