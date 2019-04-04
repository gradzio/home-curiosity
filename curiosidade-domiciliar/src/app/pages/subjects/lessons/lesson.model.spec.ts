import { LessonModel } from './lesson.model';

describe('LessonModel', () => {
    let lesson;
    beforeEach(() => {
        lesson = new LessonModel('guid', 'name', 'icon_name', 'www.video.com/url', false);
    });
    it('should create', () => {
        expect(lesson.guid).toEqual('guid');
        expect(lesson.name).toEqual('name');
        expect(lesson.icon).toEqual('icon_name');
        expect(lesson.videoUrl).toEqual('www.video.com/url');
        expect(lesson.isCompleted).toBe(false);
    });

    it('should complete a lesson', () => {
        expect(lesson.isCompleted).toBe(false);

        lesson.complete();

        expect(lesson.isCompleted).toBe(true);
    });
});
