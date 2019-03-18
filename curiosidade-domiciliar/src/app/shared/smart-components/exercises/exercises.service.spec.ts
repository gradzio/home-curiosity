import { ExercisesService } from "./exercises.service.stub";
import { Exercise } from './exercise.model';
import { last } from 'rxjs/operators';
import { of } from 'rxjs';
import { ExerciseProvider } from 'src/tests/exercise.provider';

describe('ExercisesService', () => {
    let service: ExercisesService;

    beforeAll(() => {
        service = new ExercisesService();
    });
    it('should getAll', () => {

        const actual$ = service.getAll();

        actual$.subscribe(exercises => {
            expect(exercises.length).toBeGreaterThan(0);
            expect(exercises[0]).toEqual(jasmine.any(Exercise));
        });
    });

    it('should set first exercise by default', () => {
        const exercises = ExerciseProvider.twoNotCompleted;
        service.exercises$ = of(exercises);
        service.current$
            .subscribe(exercise => expect(exercise).toEqual(exercises[0]))
            .unsubscribe();
    });

    it('should set next Exercise', () => {
        const exercises = ExerciseProvider.twoNotCompleted;
        service.exercises$ = of(exercises);

        service.nextExercise();

        service.current$
            .subscribe(exercise => expect(exercise).toEqual(exercises[1]))
            .unsubscribe();
    });

});