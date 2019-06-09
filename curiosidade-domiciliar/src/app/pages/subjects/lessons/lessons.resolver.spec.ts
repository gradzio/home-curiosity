import { LessonsResolver } from './lessons.resolver';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LessonsService } from './lessons.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { LessonsProvider } from 'src/tests/lessons.provider';
import { NgxsModule, Store } from '@ngxs/store';
import { SubjectState, GetLessons } from '../subject.state';
import { ExercisesState } from '../../../shared/smart-components/exercises/exercises.state';
import { ExercisesService } from '../../../shared/smart-components/exercises/exercises.service';
import { SubjectStateProvider } from 'src/tests/subject-state.provider';
import { TimerService } from 'src/app/shared/services/timer.service';

describe('LessonsResolver', () => {
    let router: Router;
    let store;
    let lessonResolver: LessonsResolver;
    const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([SubjectState, ExercisesState]),
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule
            ],
            providers: [
                LessonsResolver,
                ExercisesService,
                LessonsService,
                {provide: RouterStateSnapshot, useValue: mockSnapshot},
                TimerService
            ]
        });
        router = TestBed.get(Router);
        store = TestBed.get(Store);
        spyOn(store, 'dispatch');
        lessonResolver = TestBed.get(LessonsResolver);
    });

    it('should create', () => {
        expect(lessonResolver).toBeTruthy();
        expect(lessonResolver).toEqual(jasmine.any(LessonsResolver));
    });

    it('should fall back on page reload', () => {
        store.reset(SubjectStateProvider.EMPTY_LESSONS);
        const activatedRouteSnapshot = new ActivatedRouteSnapshot();
        activatedRouteSnapshot.params = {subject: 'subject'};
        lessonResolver.resolve(activatedRouteSnapshot, mockSnapshot);

        expect(store.dispatch).toHaveBeenCalledWith(new GetLessons('subject'));
    });

    it('should use existing lessons', () => {
        store.reset(SubjectStateProvider.TWO_LESSONS);
        const activatedRouteSnapshot = new ActivatedRouteSnapshot();
        activatedRouteSnapshot.params = {subject: 'subject'};
        lessonResolver.resolve(activatedRouteSnapshot, mockSnapshot);

        expect(store.dispatch).not.toHaveBeenCalledWith(new GetLessons('subject'));
    });
});
