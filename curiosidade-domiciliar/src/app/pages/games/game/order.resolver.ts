import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/core/collection';
import { Store } from '@ngxs/store';
import { ExercisesRequested } from '../../../shared/smart-components/exercises/exercises.state';
import { ExerciseModel } from '../../../shared/smart-components/exercises/exercise.model';

@Injectable({
    providedIn: 'root',
})
export class OrderGameResolver implements Resolve<Collection<ExerciseModel>> {
    constructor(private _store: Store, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Collection<ExerciseModel>> {
        return this._store.dispatch(new ExercisesRequested('exerciseGuid3'));
    }
}
