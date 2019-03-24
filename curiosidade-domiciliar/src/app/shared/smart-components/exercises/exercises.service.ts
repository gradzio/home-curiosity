import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';
import { Collection } from 'src/app/core/collection';
import { HttpClient } from '@angular/common/http';
import { ExerciseFactory } from './exercise.factory';
import { TouchSequence } from 'selenium-webdriver';

@Injectable()
export class ExercisesService {
    private _currentSubject = new BehaviorSubject(null);
    current$: Observable<Exercise> = this._currentSubject.asObservable();

    // TODO: Return type
    private _exercisesSubject = new BehaviorSubject<Collection<Exercise>>(new Collection([]));
    exercises$ = this._exercisesSubject.asObservable();

    baseUrl = '/assets/mocks';

    constructor(private client: HttpClient) {}

    getAll() {
        this.client.get(`${this.baseUrl}/exercises.json`)
            .pipe(
                map(response => response['data'].map(ExerciseFactory.make))
            )
            .subscribe(exercises => this._exercisesSubject.next(new Collection<Exercise>(exercises)));
    }

    postAnswer(answerValue: string): Observable<any> {
        const exerciseGuid = this._exercisesSubject.getValue().current.guid;
        return this.client.post(`${this.baseUrl}/exercises/${exerciseGuid}/answer.json`, {answer: answerValue});
    }

    nextExercise() {
        const collection = this._exercisesSubject.getValue();
        collection.next();
        this._exercisesSubject.next(collection);
    }
}