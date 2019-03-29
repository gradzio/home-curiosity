import { LessonModel } from "./lesson.model";

fdescribe('LessonModel', () => {
    it('should create', () => {
        const lesson = new LessonModel('name', 'icon_name');
        expect(lesson.name).toEqual('name');
        expect(lesson.icon).toEqual('icon_name');
    });
});