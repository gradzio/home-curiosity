import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Collection } from 'src/app/core/collection';
import { HttpClient } from '@angular/common/http';
import { ExerciseFactory } from './exercise.factory';
import { ExerciseModel } from './exercise.model';
import { environment } from 'src/environments/environment';

export interface ExerciseResponseContract {
    guid: string;
    question: string;
    imageUrl: string;
}

@Injectable()
export class ExercisesService {
    private _exercisesSubject = new BehaviorSubject<Collection<ExerciseModel>>(new Collection([]));
    exercises$ = this._exercisesSubject.asObservable();

    private _currentLessonGuidSubject = new BehaviorSubject(null);
    currentLessonGuid$ = this._currentLessonGuidSubject.asObservable();

    constructor(private client: HttpClient) {}

    getAll(lessonGuid: string): Observable<Collection<ExerciseModel>> {
        return this.client.get(`${environment.apis.baseUrl}/subjects/math/lessons/${lessonGuid}/exercises.json`)
            .pipe(
                map(response => {
                    const exerciseCollection = new Collection<ExerciseModel>(response['data'].map(ExerciseFactory.make));
                    this._exercisesSubject.next(exerciseCollection);
                    this._currentLessonGuidSubject.next(lessonGuid);
                    return exerciseCollection;
                })
            );
    }

    nextExercise() {
        const collection = this._exercisesSubject.getValue();
        collection.next();
        this._exercisesSubject.next(collection);
    }
}
