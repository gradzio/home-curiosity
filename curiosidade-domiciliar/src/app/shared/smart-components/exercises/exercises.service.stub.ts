import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Exercise } from './exercise.model';
import { ExerciseProvider } from 'src/tests/exercise.provider';
import { map } from 'rxjs/operators';
import { Collection } from 'src/app/core/collection';

@Injectable()
export class ExercisesService {
    private _currentSubject = new BehaviorSubject(null);
    current$: Observable<Exercise> = this._currentSubject.asObservable();

    // TODO: Return type
    private _exercisesSubject = new BehaviorSubject<Collection<Exercise>>(new Collection([]));
    exercises$ = this._exercisesSubject.asObservable();

    getAll() {
        of(ExerciseProvider.twoNotCompleted)
        .pipe(
            map(exercises => {
                const notCompleted = exercises.filter(exercise => !exercise.isCompleted);
                if (notCompleted.length > 0) {
                    this._currentSubject.next(notCompleted[0]);
                }
                const exerciseCollection = new Collection<Exercise>(exercises);
                this._exercisesSubject.next(exerciseCollection);
                return exerciseCollection;
            })
        ).subscribe();
    }

    postAnswer(answerValue: string): Observable<any> {
        return of({exerciseGuid: this._currentSubject.getValue(), success: Math.random() >= 0.5});
    }

    nextExercise() {
        const collection = this._exercisesSubject.getValue();
        collection.next();
        this._exercisesSubject.next(collection);
    }
}