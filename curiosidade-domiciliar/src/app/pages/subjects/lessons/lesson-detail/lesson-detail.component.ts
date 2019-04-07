import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { ResourceCardInterface } from 'src/app/shared/presentation-components/video-card/video-card.interface';
import { LessonModel } from '../lesson.model';
import { Select } from '@ngxs/store';
import { SubjectState } from '../../subject.state';
import { Collection } from 'src/app/core/collection';
import { TopicModel } from './topic.model';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {
  @Select(SubjectState.selectedLesson)
  selectedLesson$: Observable<LessonModel>;

  videoCard$: Observable<ResourceCardInterface>;
  constructor(private route: ActivatedRoute, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.videoCard$ = this.selectedLesson$
      .pipe(
        map((lesson: LessonModel) => (lesson.topics.current.makeVideoCardViewModel(lesson.guid, this._sanitizer))
        )
      );
  }
}
