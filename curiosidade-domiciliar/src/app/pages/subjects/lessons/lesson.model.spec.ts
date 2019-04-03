import { LessonModel } from './lesson.model';

describe('LessonModel', () => {
    it('should create', () => {
        const lesson = new LessonModel('guid', 'name', 'icon_name', 'www.video.com/url');
        expect(lesson.guid).toEqual('guid');
        expect(lesson.name).toEqual('name');
        expect(lesson.icon).toEqual('icon_name');
        expect(lesson.videoUrl).toEqual('www.video.com/url');
    });
});
