import { ExerciseCollectionProvider } from 'src/tests/exercise-collection.provider';
import { of } from 'rxjs';
import { ExercisesResolver } from './exercises.resolver';
import { RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExercisesService } from './exercises.service';

describe('ExercisesResolver', () => {
    let router: Router;
    let exercisesServiceMock;
    let exercisesService;
    let exercisesResolver: ExercisesResolver;
    const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();

    beforeEach(() => {
        exercisesServiceMock = jasmine.createSpyObj('ExercisesService', ['getAll']);
        exercisesServiceMock.getAll.and.returnValue(of(ExerciseCollectionProvider.two));
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule
            ],
            providers: [
                ExercisesResolver,
                {provide: ExercisesService, useValue: exercisesServiceMock},
                {provide: RouterStateSnapshot, useValue: mockSnapshot}
            ]
        });
        router = TestBed.get(Router);
        exercisesService = TestBed.get(ExercisesService);
        exercisesService.exercises$ = of(ExerciseCollectionProvider.two);
        exercisesResolver = TestBed.get(ExercisesResolver);
    });

    it('should fall back on first fetch', () => {
        activatedRouteSnapshot.params = {lessonGuid: 'guid1'};

        exercisesService.currentLessonGuid$ = of(null);
        exercisesService.exercises$ = of(ExerciseCollectionProvider.two);

        exercisesResolver.resolve(activatedRouteSnapshot, mockSnapshot).subscribe().unsubscribe();

        expect(exercisesService.getAll).toHaveBeenCalledWith('guid1');
    });

    it('should fall back on another guid', () => {
        activatedRouteSnapshot.params = {lessonGuid: 'guid1'};

        exercisesService.currentLessonGuid$ = of('anotherguid');

        exercisesResolver.resolve(activatedRouteSnapshot, mockSnapshot).subscribe().unsubscribe();

        expect(exercisesService.getAll).toHaveBeenCalledWith('guid1');
    });

    it('should not fall back', () => {
        activatedRouteSnapshot.params = {lessonGuid: 'guid1'};

        exercisesService.currentLessonGuid$ = of('guid1');

        exercisesResolver.resolve(activatedRouteSnapshot, mockSnapshot).subscribe().unsubscribe();

        expect(exercisesService.getAll).not.toHaveBeenCalled();
    });
});
