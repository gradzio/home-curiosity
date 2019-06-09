import { ExerciseCollectionProvider } from 'src/tests/exercise-collection.provider';
import { of } from 'rxjs';
import { ExercisesResolver } from './exercises.resolver';
import { RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExercisesService } from './exercises.service';
import { NgxsModule, Store } from '@ngxs/store';
import { SubjectState, GetLessons } from '../../../pages/subjects/subject.state';
import { ExercisesState, ExercisesRequested } from './exercises.state';
import { LessonsService } from '../../../pages/subjects/lessons/lessons.service';
import { SubjectStateProvider } from 'src/tests/subject-state.provider';
import { TimerService } from 'src/app/shared/services/timer.service';

describe('ExercisesResolver', () => {
    let router: Router;
    let exercisesServiceMock;
    let store;
    let exercisesResolver: ExercisesResolver;
    const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();

    beforeEach(() => {
        activatedRouteSnapshot.params = {lessonGuid: 'lessonGuid', topicGuid: 'topicGuid', subject: 'subject'};
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
                {provide: RouterStateSnapshot, useValue: mockSnapshot},
                TimerService
            ]
        });
        router = TestBed.get(Router);
        store = TestBed.get(Store);
        spyOn(store, 'dispatch');
        exercisesResolver = TestBed.get(ExercisesResolver);
    });

    it('should get lessons on page reload', () => {
        store.reset({...SubjectStateProvider.EMPTY_LESSONS});
        store.dispatch.and.returnValue(of({...SubjectStateProvider.TWO_LESSONS_FIRST_SELECTED}))

        const subscription = exercisesResolver.resolve(activatedRouteSnapshot, mockSnapshot);

        expect(store.dispatch).toHaveBeenCalledWith(new GetLessons('subject', 'lessonGuid'));
        subscription.subscribe().unsubscribe();
    });

    it('should not get lessons on navigation', () => {
        store.reset({...SubjectStateProvider.TWO_LESSONS_FIRST_SELECTED});

        exercisesResolver.resolve(activatedRouteSnapshot, mockSnapshot);

        expect(store.dispatch).not.toHaveBeenCalledWith(new GetLessons('subject', 'lessonGuid'));
        expect(store.dispatch).toHaveBeenCalledWith(new ExercisesRequested('exerciseGuid2'));
    });
});
