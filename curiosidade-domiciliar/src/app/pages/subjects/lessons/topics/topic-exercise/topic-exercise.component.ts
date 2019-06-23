import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { IconButtonInterface } from 'src/app/shared/presentation-components/icon-button/icon-button.interface';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-topic-exercise',
  templateUrl: './topic-exercise.component.html'
})
export class TopicExerciseComponent implements OnInit {
  backLink$: Observable<string>;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.backLink$ = this._route.params.pipe(map(params => `/subjects/math/lessons/${params.lessonGuid}`));
  }
}
