import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LessonModel } from './lesson.model';
import { Observable, of } from 'rxjs';
import { LessonsService } from './lessons.service';
import { switchMap, first, flatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class LessonsResolver implements Resolve<LessonModel[]> {
    constructor(private lessonsService: LessonsService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LessonModel[]> {
        return this.lessonsService.lessons$
            .pipe(
                flatMap(lessons => {
                    if (!lessons) {
                        return this.lessonsService.getAll(route.params.subject);
                    }
                    return of(lessons);
                }),
                first()
            );
    }
}
