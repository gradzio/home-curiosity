import { LessonsResolver } from './lessons.resolver';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LessonsService } from './lessons.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { LessonsProvider } from 'src/tests/lessons.provider';

describe('LessonsResolver', () => {
    let router: Router;
    let lessonsServiceMock;
    let lessonsService;
    let lessonResolver: LessonsResolver;
    const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

    beforeEach(() => {
        lessonsServiceMock = jasmine.createSpyObj('LessonsService', ['getAll']);
        lessonsServiceMock.getAll.and.returnValue(of(LessonsProvider.two));
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule
            ],
            providers: [
                LessonsResolver,
                {provide: LessonsService, useValue: lessonsServiceMock},
                {provide: RouterStateSnapshot, useValue: mockSnapshot}
            ]
        });
        router = TestBed.get(Router);
        lessonsService = TestBed.get(LessonsService);
        lessonResolver = TestBed.get(LessonsResolver);
    });

    it('should create', () => {
        expect(lessonResolver).toBeTruthy();
        expect(lessonResolver).toEqual(jasmine.any(LessonsResolver));
    });

    it('should fall back', () => {
        lessonsService.lessons$ = of(null);
        const activatedRouteSnapshot = new ActivatedRouteSnapshot();
        activatedRouteSnapshot.params = {subject: 'subject'};
        lessonResolver.resolve(activatedRouteSnapshot, mockSnapshot)
            .subscribe(_ => expect(lessonsService.getAll).toHaveBeenCalledWith('subject'))
            .unsubscribe();
    });

    it('should not fall back', () => {
        lessonsService.lessons$ = of(LessonsProvider.two);
        const activatedRouteSnapshot = new ActivatedRouteSnapshot();
        activatedRouteSnapshot.params = {subject: 'subject'};
        lessonResolver.resolve(activatedRouteSnapshot, mockSnapshot)
            .subscribe(_ => expect(lessonsService.getAll).not.toHaveBeenCalled())
            .unsubscribe();
    });
});
