import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LessonModel } from './lesson.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class LessonsService {
    private baseUrl = '/assets/mocks';

    constructor(private client: HttpClient) {}

    getAll(subject: string): Observable<LessonModel[]> {
        return this.client.get(`${this.baseUrl}/subjects/${subject}/lessons.json`)
            .pipe(
                map(response => response['data'].map(item => new LessonModel(item.name, item.icon)))
            );
    }
}