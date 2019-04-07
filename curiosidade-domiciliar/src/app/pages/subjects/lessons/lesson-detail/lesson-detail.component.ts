import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { ResourceCardInterface } from 'src/app/shared/presentation-components/video-card/video-card.interface';
import { LessonModel } from '../lesson.model';
import { Select } from '@ngxs/store';
import { SubjectState } from '../../subject.state';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {
  @Select(SubjectState.selectedLesson)
  lesson$: Observable<LessonModel>;

  videoCard$: Observable<ResourceCardInterface>;
  constructor(private route: ActivatedRoute, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.videoCard$ = this.lesson$
      .pipe(
        map((l: LessonModel) => ({
            title: l.name,
            resourceUrl: this._sanitizer
              .bypassSecurityTrustResourceUrl(l.videoUrl),
            navigation: {
              link: `/subjects/math/lessons/${l.guid}/exercises`,
              text: 'Exercises'
            }
          })
        )
      );
  }
}
