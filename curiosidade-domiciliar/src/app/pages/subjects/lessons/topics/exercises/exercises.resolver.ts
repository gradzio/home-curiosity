import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/core/collection';
import { ExerciseModel } from './exercise.model';
import { Store } from '@ngxs/store';
import { ExercisesRequested } from './exercises.state';
import { SubjectStateInterface, GetLessons } from '../../../subject.state';

@Injectable({
    providedIn: 'root',
})
export class ExercisesResolver implements Resolve<Collection<ExerciseModel>> {
    constructor(private _store: Store, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Collection<ExerciseModel>> {
        const subjectStateSnapshot  = this._store.selectSnapshot<SubjectStateInterface>((subjectState) => subjectState.subject);

        const { subject, lessonGuid, topicGuid} = route.params;

        if (subjectStateSnapshot.lessons.length === 0) {
            this._store.dispatch(new GetLessons(subject, lessonGuid));
        }

        return this._store.dispatch(new ExercisesRequested({subject, lessonGuid, topicGuid}));
    }
}
