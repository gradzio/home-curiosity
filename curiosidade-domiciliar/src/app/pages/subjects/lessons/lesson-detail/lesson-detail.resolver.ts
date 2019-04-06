import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, flatMap } from 'rxjs/operators';
import { LessonModel } from '../lesson.model';
import { Store } from '@ngxs/store';
import { SubjectState, SubjectStateInterface, GetLessons, GetLesson } from '../../subject.state';
import { LessonsProvider } from 'src/tests/lessons.provider';

@Injectable({
    providedIn: 'root',
})
export class LessonsDetailResolver implements Resolve<LessonModel> {
    constructor(private _store: Store, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LessonModel> {
        const subjectStateSnapshot  = this._store.selectSnapshot<SubjectStateInterface>((state) => state.subject);
        
        if (subjectStateSnapshot.selectedLesson && subjectStateSnapshot.selectedLesson.guid === route.params.lessonGuid) {
            return of(subjectStateSnapshot.selectedLesson);
        }

        if (subjectStateSnapshot.lessons.length == 0) {
            return this._store.dispatch(new GetLessons(route.params.subject, route.params.lessonGuid));
        }

        return this._store.dispatch(new GetLesson(route.params.lessonGuid)).pipe(first());
    }
}
