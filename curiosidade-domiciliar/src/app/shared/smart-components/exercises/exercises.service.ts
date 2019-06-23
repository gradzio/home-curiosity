import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Collection } from 'src/app/core/collection';
import { HttpClient } from '@angular/common/http';
import { ExerciseFactory } from './exercise.factory';
import { ExerciseModel } from './exercise.model';
import { environment } from 'src/environments/environment';
import { Option } from 'src/app/shared/presentation-components/answer-box/option.interface';
import { QuestionContentConfig } from 'src/app/shared/presentation-components/question-content/question-content.interface';

export interface ExerciseResponseContract {
    guid: string;
    content: string;
    contentConfig?: QuestionContentConfig;
    type: string;
    choices?: Option[];
}

@Injectable()
export class ExercisesService {

    constructor(private client: HttpClient) {}

    getAll(exerciseGuid: string): Observable<Collection<ExerciseModel>> {
        return this.client.get(`${environment.apis.baseUrl}/exercises/${exerciseGuid}.json`)
            .pipe(
                map(response => new Collection<ExerciseModel>(response['data'].map(ExerciseFactory.make)))
            );
    }
}
