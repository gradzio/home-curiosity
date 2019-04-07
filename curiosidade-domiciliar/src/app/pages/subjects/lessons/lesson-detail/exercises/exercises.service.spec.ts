import { ExercisesService } from './exercises.service';
import { Collection } from 'src/app/core/collection';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import exercisesMock from 'src/assets/mocks/subjects/math/lessons/lessonguid1/exercises.json';
import { last } from 'rxjs/operators';

describe('ExercisesService', () => {
    let exerciseService: ExercisesService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ExercisesService],
            imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.get(HttpTestingController);
        exerciseService = TestBed.get(ExercisesService);
    });

    it('should getAll', () => {
        const subscription = exerciseService.getAll('lessonguid')
            .pipe(
                last()
            )
            .subscribe(exercises => {
                if (exercises !== null) {
                    expect(exercises).toEqual(jasmine.any(Collection));
                    expect(exercises.length).toEqual(2);
                }
            });

        const req = httpTestingController.expectOne('/assets/mocks/subjects/math/lessons/lessonguid/exercises.json');

        expect(req.request.method).toEqual('GET');

        req.flush(exercisesMock);

        httpTestingController.verify();

        subscription.unsubscribe();
    });
});
