import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LessonsService } from './lessons.service';
import { LessonModel } from './lesson.model';
import lessonsMock from 'src/assets/mocks/subjects/math/lessons.json';
import lessonMock from 'src/assets/mocks/subjects/math/lessons/lessonguid1.json';
import { Subscription } from 'rxjs';

describe('LessonsService', () => {
    let lessonsService: LessonsService;
    let httpTestingController: HttpTestingController;
    const subscriptions: Subscription[] = [];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LessonsService],
            imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.get(HttpTestingController);
        lessonsService = TestBed.get(LessonsService);
    });

    afterEach(() => {
        subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    });

    it('should getAll', () => {
        subscriptions.push(lessonsService.getAll('subject')
            .subscribe(lessons => {
                expect(lessons.length).toBeGreaterThan(0);
                expect(lessons[0]).toEqual(jasmine.any(LessonModel));
            }));
        const lessonsRequest = httpTestingController.expectOne('/assets/mocks/subjects/subject/lessons.json');
        expect(lessonsRequest.request.method).toEqual('GET');

        lessonsRequest.flush(lessonsMock);

        httpTestingController.verify();
    });

    it('should getOne', () => {
        subscriptions.push(lessonsService.getOne('lessonguid')
            .subscribe(lesson => {
                expect(lesson).toEqual(jasmine.any(LessonModel));
            }));

        const lessonsRequest = httpTestingController.expectOne('/assets/mocks/subjects/math/lessons/lessonguid.json');
        expect(lessonsRequest.request.method).toEqual('GET');

        lessonsRequest.flush(lessonMock);

        httpTestingController.verify();
    });
});
