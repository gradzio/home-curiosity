import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, flatMap } from 'rxjs/operators';
import { LessonModel } from '../lesson.model';
import { LessonsService } from '../lessons.service';

@Injectable({
    providedIn: 'root',
})
export class LessonsDetailResolver implements Resolve<LessonModel> {
    constructor(private lessonsService: LessonsService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LessonModel> {
        return this.lessonsService.lessons$
            .pipe(
                flatMap(lessons => {
                    if (!lessons) {
                        lessons = [];
                    }
                    const singleLesson = lessons.find(lesson => lesson.guid === route.params.lessonGuid);
                    if (!singleLesson) {
                        return this.lessonsService.getOne(route.params.lessonGuid);
                    }
                    return of(singleLesson);
                }),
                first()
            );
    }
}
