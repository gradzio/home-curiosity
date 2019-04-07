import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, flatMap } from 'rxjs/operators';
import { LessonModel } from '../lesson.model';
import { Store } from '@ngxs/store';
import { SubjectStateInterface, GetLessons, SelectLesson } from '../../subject.state';

@Injectable({
    providedIn: 'root',
})
export class LessonsDetailResolver implements Resolve<LessonModel> {
    constructor(private _store: Store, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LessonModel> {
        const subjectStateSnapshot  = this._store.selectSnapshot<SubjectStateInterface>((state) => state.subject);
        
        if (subjectStateSnapshot.lessons.find(lesson => lesson.guid === route.params.lessonGuid)) {
            return this._store.dispatch(new SelectLesson(route.params.lessonGuid));
        }

        return this._store.dispatch(new GetLessons(route.params.subject, route.params.lessonGuid));
    }
}
