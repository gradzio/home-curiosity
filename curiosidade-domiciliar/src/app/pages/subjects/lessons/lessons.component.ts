import { Component, OnInit } from '@angular/core';
import { LessonsService } from './lessons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LessonModel } from './lesson.model';
import { IconButton } from 'src/app/shared/presentation-components/icon-button/icon-button';
import { IconButtonInterface } from 'src/app/shared/presentation-components/icon-button/icon-button.interface';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
  providers: [LessonsService]
})
export class LessonsComponent implements OnInit {

  iconButtonVMs$: Observable<IconButtonInterface[]>;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.iconButtonVMs$ = this.route.data
      .pipe(
        map(data => data.lessons.map(lesson => { return {
          name: lesson.name,
          icon: lesson.icon,
          navigationLink: `/subjects/math/lessons/${lesson.guid}`
            }
        }))
      );
  }
}
