import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { first, flatMap, map } from 'rxjs/operators';
import { Collection } from 'src/app/core/collection';
import { ExercisesService } from './exercises.service';
import { ExerciseModel } from './exercise.model';
import { Store } from '@ngxs/store';
import { GetExercises } from './exercises.state';
import { SubjectStateInterface, GetLessons } from '../../../subject.state';

@Injectable({
    providedIn: 'root',
})
export class ExercisesResolver implements Resolve<Collection<ExerciseModel>> {
    constructor(private _store: Store, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Collection<ExerciseModel>> {
        const subjectStateSnapshot  = this._store.selectSnapshot<SubjectStateInterface>((state) => state.subject);

        if (subjectStateSnapshot.lessons.length == 0) {
            this._store.dispatch(new GetLessons(route.params.subject, route.params.lessonGuid));
        }

        return this._store.dispatch(new GetExercises(route.params.lessonGuid)).pipe(first());
    }
}
