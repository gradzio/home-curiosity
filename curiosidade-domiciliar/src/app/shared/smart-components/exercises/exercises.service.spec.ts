import { ExercisesService } from './exercises.service';
import { Collection } from 'src/app/core/collection';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import exercisesMock from '../../../../assets/mocks/exercises.json';
import postAnswerMock from '../../../../assets/mocks/exercises/guid1/answer.json';
import { last } from 'rxjs/operators';

describe('ExercisesService', () => {
    let exerciseService: ExercisesService;
    let httpTestingController: HttpTestingController;

    beforeAll(() => {
        TestBed.configureTestingModule({
            providers: [ExercisesService],
            imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.get(HttpTestingController);
        exerciseService = TestBed.get(ExercisesService);
    });

    it('should getAll', () => {
        exerciseService.getAll();

        exerciseService.exercises$
            .pipe(
                last()
            )
            .subscribe(exercises => {
                if (exercises !== null) {
                    console.log(exercises);
                    expect(exercises).toEqual(jasmine.any(Collection));
                    expect(exercises.length).toEqual(1);
                }
            }).unsubscribe();

        const req = httpTestingController.expectOne('/assets/mocks/exercises.json');

        expect(req.request.method).toEqual('GET');

        req.flush(exercisesMock);

        httpTestingController.verify();
    });

    it('should postAnswer', () => {
        exerciseService.postAnswer('answer')
            .subscribe(answer => expect(answer.success).toBe(true));

        const req = httpTestingController.expectOne('/assets/mocks/exercises/guid1/answer.json');

        expect(req.request.method).toEqual('POST');

        req.flush(postAnswerMock);

        httpTestingController.verify();
    });

    it('should set next Exercise', () => {
        exerciseService.getAll();

        const req = httpTestingController.expectOne('/assets/mocks/exercises.json');

        expect(req.request.method).toEqual('GET');

        req.flush(exercisesMock);

        exerciseService.nextExercise();

        exerciseService.exercises$
            .subscribe(exercises => expect(exercises.progress.current).toEqual(2))
            .unsubscribe();
    });

});
