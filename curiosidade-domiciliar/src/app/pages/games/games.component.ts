import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { IconButtonInterface } from 'src/app/shared/presentation-components/icon-button/icon-button.interface';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  iconButtonVMs$: Observable<IconButtonInterface[]>;
  constructor() { }

  ngOnInit() {
    this.iconButtonVMs$ = of([{
      name: 'Count',
      icon: 'filter_1',
      navigationLink: '/games/count',
      isDisabled: false
    }, {
      name: 'Choice',
      icon: 'question_answer',
      navigationLink: '/games/choice',
      isDisabled: false
    }]);
  }

}
