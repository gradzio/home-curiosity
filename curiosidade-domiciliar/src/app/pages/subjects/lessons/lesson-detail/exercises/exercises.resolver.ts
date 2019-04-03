import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { first, flatMap, map } from 'rxjs/operators';
import { Collection } from 'src/app/core/collection';
import { ExercisesService } from './exercises.service';
import { ExerciseModel } from './exercise.model';

@Injectable({
    providedIn: 'root',
})
export class ExercisesResolver implements Resolve<Collection<ExerciseModel>> {
    constructor(private exercisesService: ExercisesService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Collection<ExerciseModel>> {
        return combineLatest(
                this.exercisesService.exercises$,
                this.exercisesService.currentLessonGuid$
            )
            .pipe(
                map(result => ({exercises: result[0], lessonGuid: result[1]})),
                flatMap(dataMap => {
                    if (dataMap.lessonGuid !== route.params.lessonGuid) {
                        return this.exercisesService.getAll(route.params.lessonGuid);
                    }
                    return of(dataMap.exercises);
                }),
                first()
            );
    }
}
