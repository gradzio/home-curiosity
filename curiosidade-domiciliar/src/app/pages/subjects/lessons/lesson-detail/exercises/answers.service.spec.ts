import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnswersService } from './answers.service';
import createAnswerMock from 'src/assets/mocks/exercises/guid1/answer.json';

describe('AnswersService', () => {
    let answerService;
    let httpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [AnswersService]
        });
        answerService = TestBed.get(AnswersService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should create answer', () => {
        answerService.create('answer', 'guid1')
            .subscribe(answer => expect(answer.success).toBe(true));

        const req = httpTestingController.expectOne('/assets/mocks/exercises/guid1/answer.json');

        req.flush(createAnswerMock);

        httpTestingController.verify();
    });
});
