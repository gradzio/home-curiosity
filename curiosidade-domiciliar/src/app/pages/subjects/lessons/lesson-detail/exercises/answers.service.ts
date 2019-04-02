import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AnswersService {

    constructor(private client: HttpClient) {}

    create(answerValue: string, exerciseGuid: string): Observable<any> {
        return this.client.get(`${environment.apis.baseUrl}/exercises/${exerciseGuid}/answer.json`);
    }
}