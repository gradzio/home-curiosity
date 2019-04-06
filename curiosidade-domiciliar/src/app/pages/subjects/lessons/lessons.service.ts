import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LessonModel } from './lesson.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LessonFactory } from './lesson.factory';
import { environment } from 'src/environments/environment';

export interface LessonResponseContract {
        guid: string;
        name: string;
        icon: string;
        videoUrl: string;
        isCompleted: boolean;
}

@Injectable()
export class LessonsService {

    private _lessonsSubject = new BehaviorSubject<LessonModel[]>(null);
    lessons$ = this._lessonsSubject.asObservable();

    constructor(private client: HttpClient) {}

    getAll(subject: string): Observable<LessonModel[]> {
        return this.client.get(`${environment.apis.baseUrl}/subjects/${subject}/lessons.json`)
            .pipe(
                map(response => {
                    const lessons = response['data'].map(LessonFactory.make);
                    this._lessonsSubject.next(lessons);
                    return lessons;
                })
            );
    }

    getOne(lessonGuid: string): Observable<LessonModel> {
        return this.client.get(`${environment.apis.baseUrl}/subjects/math/lessons/${lessonGuid}.json`)
            .pipe(
                map(response => response['data']),
                map(LessonFactory.make)
            );
    }
}
