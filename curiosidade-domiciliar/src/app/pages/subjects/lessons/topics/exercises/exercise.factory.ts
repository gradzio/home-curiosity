import { ExerciseResponseContract } from './exercises.service';
import { ExerciseModel } from './exercise.model';

export class ExerciseFactory {
    static make(object: ExerciseResponseContract) {
        return new ExerciseModel(object.guid, object.question, object.imageUrl, object.choices);
    }
}
