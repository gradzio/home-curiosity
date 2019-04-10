import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LessonModel } from '../lesson.model';
import { Store } from '@ngxs/store';
import { SubjectStateInterface, GetLessons, SelectLesson } from '../../subject.state';

@Injectable({
    providedIn: 'root',
})
export class TopicsResolver implements Resolve<LessonModel> {
    constructor(private _store: Store, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LessonModel> {
        const subjectStateSnapshot  = this._store
            .selectSnapshot<SubjectStateInterface>((appState) => appState.subject);

        const lesson = subjectStateSnapshot.lessons
            .find(l => l.guid === route.params.lessonGuid);

        if (lesson) {
            return this._store.dispatch(new SelectLesson(lesson));
        }

        return this._store.dispatch(new GetLessons(route.params.subject, route.params.lessonGuid));
    }
}
