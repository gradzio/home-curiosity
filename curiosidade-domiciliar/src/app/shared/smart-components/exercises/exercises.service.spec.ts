import { ExercisesService } from "./exercises.service.stub";
import { Exercise } from './exercise.model';

describe('ExercisesService', () => {
    it('should create', () => {
        const service = new ExercisesService();

        const actual$ = service.getAll();

        actual$.subscribe(exercises => {
            expect(exercises.length).toBeGreaterThan(0);
            expect(exercises[0]).toEqual(jasmine.any(Exercise));
        });
    });
});