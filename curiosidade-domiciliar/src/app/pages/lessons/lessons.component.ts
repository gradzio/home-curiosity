import { Component, OnInit } from '@angular/core';
import { LessonsService } from './lessons.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LessonModel } from './lesson.model';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
  providers: [LessonsService]
})
export class LessonsComponent implements OnInit {

  lessons$: Observable<LessonModel[]>;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.lessons$ = this.route.data.pipe(map(data => data.lessons));
  }

}
