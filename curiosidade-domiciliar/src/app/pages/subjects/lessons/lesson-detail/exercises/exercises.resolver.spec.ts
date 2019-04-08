import { ExerciseCollectionProvider } from 'src/tests/exercise-collection.provider';
import { of } from 'rxjs';
import { ExercisesResolver } from './exercises.resolver';
import { RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExercisesService } from './exercises.service';
import { NgxsModule, Store } from '@ngxs/store';
import { SubjectState, SubjectStateInterface, GetLessons } from '../../../subject.state';
import { ExercisesState, GetExercises } from './exercises.state';
import { LessonsService } from '../../lessons.service';
import { LessonsProvider } from 'src/tests/lessons.provider';
import { SubjectStateProvider } from 'src/tests/subject-state.provider';

describe('ExercisesResolver', () => {
    let router: Router;
    let exercisesServiceMock;
    let store;
    let exercisesResolver: ExercisesResolver;
    const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();

    beforeEach(() => {
        activatedRouteSnapshot.params = {lessonGuid: 'guid1', topicGuid: 'topicGuid', subject: 'subject'};
        exercisesServiceMock = jasmine.createSpyObj('ExercisesService', ['getAll']);
        exercisesServiceMock.getAll.and.returnValue(of(ExerciseCollectionProvider.two));
        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([SubjectState, ExercisesState]),
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule
            ],
            providers: [
                ExercisesResolver,
                ExercisesService,
                LessonsService,
                {provide: RouterStateSnapshot, useValue: mockSnapshot}
            ]
        });
        router = TestBed.get(Router);
        store = TestBed.get(Store);
        spyOn(store, 'dispatch');
        exercisesResolver = TestBed.get(ExercisesResolver);
    });

    it('should get lessons on page reload', () => {
        store.reset(SubjectStateProvider.EMPTY_LESSONS);

        exercisesResolver.resolve(activatedRouteSnapshot, mockSnapshot);

        expect(store.dispatch).toHaveBeenCalledWith(new GetLessons('subject', 'guid1'));
        expect(store.dispatch).toHaveBeenCalledWith(new GetExercises('topicGuid'));
    });

    it('should not get lessons on navigation', () => {
        store.reset(SubjectStateProvider.TWO_LESSONS);

        exercisesResolver.resolve(activatedRouteSnapshot, mockSnapshot);

        expect(store.dispatch).not.toHaveBeenCalledWith(new GetLessons('subject', 'guid1'));
        expect(store.dispatch).toHaveBeenCalledWith(new GetExercises('topicGuid'));
    });
});
