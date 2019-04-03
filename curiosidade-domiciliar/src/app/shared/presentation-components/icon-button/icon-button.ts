import { Component, OnInit, Input } from '@angular/core';
import { IconButtonInterface } from './icon-button.interface';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.html',
  styleUrls: ['./icon-button.scss']
})
export class IconButton implements OnInit {
  @Input()
  item: IconButtonInterface;

  constructor() { }

  ngOnInit() {
  }

}
