import { ExerciseCollectionProvider } from 'src/tests/exercise-collection.provider';
import { of } from 'rxjs';
import { RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { SubjectStateProvider } from 'src/tests/subject-state.provider';
import { TimerService } from 'src/app/shared/services/timer.service';
import { ChoiceGameResolver } from './choice.resolver';
import { ExercisesState, ExercisesRequested } from '../../../shared/smart-components/exercises/exercises.state';
import { ExercisesService } from '../../../shared/smart-components/exercises/exercises.service';

describe('ChoiceGameResolver', () => {
    let router: Router;
    let exercisesServiceMock;
    let store;
    let choiceResolver: ChoiceGameResolver;
    const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();

    beforeEach(() => {
        activatedRouteSnapshot.params = {game: 'count'};
        exercisesServiceMock = jasmine.createSpyObj('ExercisesService', ['getAll']);
        exercisesServiceMock.getAll.and.returnValue(of(ExerciseCollectionProvider.two));
        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([ExercisesState]),
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule
            ],
            providers: [
                {provide: RouterStateSnapshot, useValue: mockSnapshot},
                TimerService,
                ExercisesService
            ]
        });
        router = TestBed.get(Router);
        store = TestBed.get(Store);
        spyOn(store, 'dispatch');
        choiceResolver = TestBed.get(ChoiceGameResolver);
    });

    it('should get exercises', () => {
        store.reset(SubjectStateProvider.TWO_LESSONS);

        choiceResolver.resolve(activatedRouteSnapshot, mockSnapshot);

        expect(store.dispatch).toHaveBeenCalledWith(new ExercisesRequested('exerciseGuid1'));
    });
});
