import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LessonsDetailResolver } from './lesson-detail.resolver';
import { LessonsProvider } from 'src/tests/lessons.provider';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LessonsService } from '../lessons.service';


describe('LessonsDetailResolver', () => {
    let router: Router;
    let lessonsServiceMock;
    let lessonsService;
    let lessonDetailResolver: LessonsDetailResolver;
    const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();

    beforeEach(() => {
        lessonsServiceMock = jasmine.createSpyObj('LessonsService', ['getOne']);
        lessonsServiceMock.getOne.and.returnValue(of(LessonsProvider.two));
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule
            ],
            providers: [
                LessonsDetailResolver,
                {provide: LessonsService, useValue: lessonsServiceMock},
                {provide: RouterStateSnapshot, useValue: mockSnapshot}
            ]
        });
        router = TestBed.get(Router);
        lessonsService = TestBed.get(LessonsService);
        lessonDetailResolver = TestBed.get(LessonsDetailResolver);
    });

    it('should create', () => {
        expect(lessonDetailResolver).toBeTruthy();
        expect(lessonDetailResolver).toEqual(jasmine.any(LessonsDetailResolver));
    });

    it('should fall back', () => {
        lessonsService.lessons$ = of(null);
        activatedRouteSnapshot.params = {lessonGuid: 'guid1'};

        lessonDetailResolver.resolve(activatedRouteSnapshot, mockSnapshot)
            .subscribe(_ => expect(lessonsService.getOne).toHaveBeenCalledWith('guid1'))
            .unsubscribe();
    });

    it('should fall back on invalid guid', () => {
        lessonsService.lessons$ = of(LessonsProvider.two);
        activatedRouteSnapshot.params = {lessonGuid: 'differentguid'};
        lessonDetailResolver.resolve(activatedRouteSnapshot, mockSnapshot)
            .subscribe(_ => expect(lessonsService.getOne).toHaveBeenCalledWith('differentguid'))
            .unsubscribe();
    });

    it('should not fall back', () => {
        lessonsService.lessons$ = of(LessonsProvider.two);
        activatedRouteSnapshot.params = {lessonGuid: 'guid1'};

        lessonDetailResolver.resolve(activatedRouteSnapshot, mockSnapshot)
            .subscribe(_ => expect(lessonsService.getOne).not.toHaveBeenCalled())
            .unsubscribe();
    });
});
