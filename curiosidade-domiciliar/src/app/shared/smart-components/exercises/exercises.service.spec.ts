import { ExercisesService } from "./exercises.service.stub";
import { ExerciseProvider } from 'src/tests/exercise.provider';
import { Collection } from 'src/app/core/collection';

describe('ExercisesService', () => {
    let service: ExercisesService;

    beforeAll(() => {
        service = new ExercisesService();
    });
    it('should getAll', () => {
        service.getAll();
        service.exercises$
            .subscribe(exercises => {
                expect(exercises).toEqual(jasmine.any(Collection));
            })
            .unsubscribe();
    });

    it('should have right default', () => {
        service.getAll();
        service.exercises$
            .subscribe(exercises => {
                expect(exercises.progress.current).toEqual(1);
            }).unsubscribe();

        
    });

    it('should set next Exercise', () => {
        service.getAll();

        service.nextExercise();

        service.exercises$
            .subscribe(exercises => expect(exercises.progress.current).toEqual(2))
            .unsubscribe();
    });

});