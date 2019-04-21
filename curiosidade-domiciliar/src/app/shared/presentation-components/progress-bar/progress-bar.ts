import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Progress } from 'src/app/core/progress';
import { ProgressBarInterface } from './progress-bar.interface';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.html',
  styleUrls: ['./progress-bar.scss']
})
export class ProgressBar {
  @HostBinding('class') classes = 'app-progress-bar';
  @Input()
  public progress: ProgressBarInterface;
}
