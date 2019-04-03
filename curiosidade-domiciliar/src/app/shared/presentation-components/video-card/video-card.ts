import { Component, OnInit, Input } from '@angular/core';
import { ResourceCardInterface } from './video-card.interface';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.html',
  styleUrls: ['./video-card.scss']
})
export class VideoCard {
  @Input() item: ResourceCardInterface;
}
