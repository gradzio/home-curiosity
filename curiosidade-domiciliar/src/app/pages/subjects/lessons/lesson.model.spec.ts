import { LessonModel } from './lesson.model';
import { TopicProvider } from 'src/tests/topic.provider';
import { Collection } from 'src/app/core/collection';

describe('LessonModel', () => {
    let lesson;
    beforeEach(() => {
        lesson = new LessonModel('guid', 'name', 'icon_name', false);
    });

    it('should create', () => {
        expect(lesson.guid).toEqual('guid');
        expect(lesson.name).toEqual('name');
        expect(lesson.icon).toEqual('icon_name');
        expect(lesson.isCompleted).toBe(false);
    });

    it('should complete a lesson', () => {
        expect(lesson.isCompleted).toBe(false);

        lesson.complete();

        expect(lesson.isCompleted).toBe(true);
    });

    it('should set topics', () => {
        lesson.topics = new Collection(TopicProvider.TWO);

        expect(lesson.topics.length).toEqual(2);
    });
});
