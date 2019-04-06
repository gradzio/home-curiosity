import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LessonModel } from './lesson.model';
import { Observable, of, EMPTY } from 'rxjs';
import { LessonsService } from './lessons.service';
import { switchMap, first, flatMap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { GetLessons, SubjectState, SubjectStateInterface } from '../subject.state';

@Injectable({
    providedIn: 'root',
})
export class LessonsResolver implements Resolve<any> {
    constructor(private _store: Store, private _router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LessonModel[]> {
        const lessons = this._store.selectSnapshot<LessonModel[]>((state) => state.subject.lessons);
        if (lessons.length) {
            return of(lessons);
        }

        return this._store.dispatch(new GetLessons(route.params.subject)).pipe(first());
    }
}
