import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { ResourceCardInterface } from 'src/app/shared/presentation-components/video-card/video-card.interface';
import { LessonModel } from '../lesson.model';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {

  videoCard$: Observable<ResourceCardInterface>;
  constructor(private route: ActivatedRoute, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.videoCard$ = this.route.data
      .pipe(
        map((data: {lesson: LessonModel}) => {
          return {
            title: data.lesson.name,
            resourceUrl: this._sanitizer.bypassSecurityTrustResourceUrl(data.lesson.videoUrl),
            navigation: {
              link: `/subjects/math/lessons/${data.lesson.guid}/exercises`,
              text: 'Exercises'
            }
          };
        })
      );
  }
}
