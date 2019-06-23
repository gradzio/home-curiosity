import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TopicsResolver } from './topics.resolver';
import { LessonsProvider } from 'src/tests/lessons.provider';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LessonsService } from '../lessons.service';
import { ExercisesService } from '../../../../shared/smart-components/exercises/exercises.service';
import { SubjectState, GetLessons, SelectLesson } from '../../subject.state';
import { ExercisesState } from '../../../../shared/smart-components/exercises/exercises.state';
import { NgxsModule, Store } from '@ngxs/store';
import { SubjectStateProvider } from 'src/tests/subject-state.provider';
import { TimerService } from 'src/app/shared/services/timer.service';


describe('TopicsResolver', () => {
    let router: Router;
    let lessonsServiceMock;
    let store;
    let lessonDetailResolver: TopicsResolver;
    const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();

    beforeEach(() => {
        lessonsServiceMock = jasmine.createSpyObj('LessonsService', ['getOne']);
        lessonsServiceMock.getOne.and.returnValue(of(LessonsProvider.two));
        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([SubjectState, ExercisesState]),
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule
            ],
            providers: [
                TopicsResolver,
                ExercisesService,
                LessonsService,
                {provide: RouterStateSnapshot, useValue: mockSnapshot},
                TimerService
            ]
        });
        router = TestBed.get(Router);
        store = TestBed.get(Store);
        spyOn(store, 'dispatch');
        lessonDetailResolver = TestBed.get(TopicsResolver);
    });

    it('should create', () => {
        expect(lessonDetailResolver).toBeTruthy();
        expect(lessonDetailResolver).toEqual(jasmine.any(TopicsResolver));
    });

    it('should call lessons on page reload', () => {
        store.reset(SubjectStateProvider.EMPTY_LESSONS);
        activatedRouteSnapshot.params = {subject: 'subject', lessonGuid: 'guid1'};

        lessonDetailResolver.resolve(activatedRouteSnapshot, mockSnapshot);

        expect(store.dispatch).toHaveBeenCalledWith(new GetLessons('subject', 'guid1'));
    });

    it('should select a lesson from existing lessons', () => {
        store.reset(SubjectStateProvider.TWO_LESSONS);
        activatedRouteSnapshot.params = {subject: 'subject', lessonGuid: 'guid1'};

        lessonDetailResolver.resolve(activatedRouteSnapshot, mockSnapshot);

        expect(store.dispatch).not.toHaveBeenCalledWith(new GetLessons('subject', 'guid1'));
        expect(store.dispatch).toHaveBeenCalledWith(new SelectLesson(LessonsProvider.two[0]));
    });
});
