import { Exercise } from './exercise.model';

export interface ExercisesResponseContract {
    guid: string;
    question: string;
    imageUrl: string;
}
export class ExerciseFactory {
    static make(object: ExercisesResponseContract) {
        return new Exercise(object.guid, object.question, object.imageUrl);
    }
}