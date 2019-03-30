import { LessonsResolver } from "./lessons.resolver";
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { LessonsService } from './lessons.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { LessonModel } from './lesson.model';
import { debug } from 'util';
import { async } from 'q';
import { HttpErrorResponse } from '@angular/common/http';

fdescribe('LessonsResolver', () => {
    let router: Router;
    // const mockLessonsService: any = jasmine.createSpyObj<LessonsService>('LessonsService', ['getAll']);s
    let lessonsService;
    let lessonResolver: LessonsResolver;
    const mockSnapshot:any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule
            ],
            providers: [
                LessonsResolver,
                LessonsService,
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

    it('should return lessons', () => {
        spyOn(lessonsService, 'getAll');
        spyOn(router, 'navigate');
        const activatedRouteSnapshot = new ActivatedRouteSnapshot();
        activatedRouteSnapshot.params = {subject: 'subject'};
        lessonResolver.resolve(activatedRouteSnapshot, mockSnapshot);

        expect(lessonsService.getAll).toHaveBeenCalledWith('subject');
        expect(router.navigate).not.toHaveBeenCalled();
    });
});