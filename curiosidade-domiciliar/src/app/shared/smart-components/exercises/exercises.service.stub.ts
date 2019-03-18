import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Exercise } from './exercise.model';
import { ExerciseProvider } from 'src/tests/exercise.provider';
import { map } from 'rxjs/operators';

@Injectable()
export class ExercisesService {
    private _currentSubject = new BehaviorSubject(null);
    current$: Observable<Exercise> = this._currentSubject.asObservable();

    private _exercisesSubject = new BehaviorSubject([]);
    exercises$: Observable<Exercise[]> = this._exercisesSubject.asObservable();

    getAll(): Observable<Exercise[]> {
        return of(ExerciseProvider.twoNotCompleted)
        .pipe(
            map(exercises => {
                const notCompleted = exercises.filter(exercise => !exercise.isCompleted);
                if (notCompleted.length > 0) {
                    this._currentSubject.next(notCompleted[0]);
                }
                this._exercisesSubject.next(exercises);
                return exercises;
            })
        );
    }

    postAnswer(answerValue: string): Observable<any> {
        return of({exerciseGuid: this._currentSubject.getValue(), success: Math.random() >= 0.5});
    }

    nextExercise() {
        const current = this._currentSubject.getValue();
        const all = this._exercisesSubject.getValue();
        let foundCurrent = false;
        this._exercisesSubject.next(all.map(exercise => {
            if (foundCurrent) {
                this._currentSubject.next(exercise);
            } else {
                exercise.complete();
            }

            if (exercise.isEqual(current)) {
                foundCurrent = true;
            }
            return exercise;
        }));
    }
}