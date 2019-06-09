import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/core/collection';
import { ExerciseModel } from './exercise.model';
import { Store } from '@ngxs/store';
import { ExercisesRequested } from './exercises.state';
import { SubjectStateInterface, GetLessons } from '../../../pages/subjects/subject.state';
import { tap, switchMap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ExercisesResolver implements Resolve<Collection<ExerciseModel>> {
    constructor(private _store: Store, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Collection<ExerciseModel>> {
        const subjectStateSnapshot  = this._store.selectSnapshot<SubjectStateInterface>((subjectState) => subjectState.subject);

        const { subject, lessonGuid } = route.params;

        if (!subjectStateSnapshot.selectedLesson) {
            return this._store.dispatch(new GetLessons(subject, lessonGuid))
            .pipe(
                switchMap(scope => this._store.dispatch(new ExercisesRequested(scope.subject.selectedLesson.topics.current.exerciseGuid)))
            )
        }

        return this._store.dispatch(new ExercisesRequested(subjectStateSnapshot.selectedLesson.topics.current.exerciseGuid));
    }
}
