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

    constructor(private client: HttpClient) {}

    getAll(lessonGuid: string): Observable<Collection<ExerciseModel>> {
        return this.client.get(`${environment.apis.baseUrl}/subjects/math/lessons/${lessonGuid}/exercises.json`)
            .pipe(
                map(response => new Collection<ExerciseModel>(response['data'].map(ExerciseFactory.make)))
            );
    }
}
