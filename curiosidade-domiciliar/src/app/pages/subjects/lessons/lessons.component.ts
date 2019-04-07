import { Component, OnInit } from '@angular/core';
import { LessonsService } from './lessons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LessonModel } from './lesson.model';
import { IconButton } from 'src/app/shared/presentation-components/icon-button/icon-button';
import { IconButtonInterface } from 'src/app/shared/presentation-components/icon-button/icon-button.interface';
import { ResourceCardInterface } from 'src/app/shared/presentation-components/video-card/video-card.interface';
import { SubjectState, SubjectStateInterface, GetLessons } from '../subject.state';
import { Select, Store, Selector } from '@ngxs/store';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  @Select(SubjectState.lessons)
  lessons$: Observable<LessonModel[]>;

  iconButtonVMs$: Observable<IconButtonInterface[]>;
  constructor(private store: Store) { }

  ngOnInit() {
    this.iconButtonVMs$ = this.lessons$
      .pipe(
        map(lessons => lessons.map((lesson: LessonModel) => lesson.makeIconButtonViewModel())
        )
      );
  }
}
