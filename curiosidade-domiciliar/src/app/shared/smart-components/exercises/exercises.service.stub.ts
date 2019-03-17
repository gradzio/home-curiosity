import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Exercise } from './exercise.model';
import { ExerciseProvider } from 'src/tests/exercise.provider';

@Injectable()
export class ExercisesService {
    getAll(): Observable<Exercise[]> {
        return of(ExerciseProvider.twoNotCompleted);
    }

    postAnswer(exerciseGuid: string, answerValue: string): Observable<any> {
        return of({exerciseGuid, success: Math.random() >= 0.5});
    }
}