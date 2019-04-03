import { LessonModel } from './lesson.model';
import { LessonFactory } from './lesson.factory';

describe('LessonFactory', () => {
    it('should make object', () => {
        const actual = LessonFactory.make({
            guid: 'lessonguid1',
            name: 'name',
            icon: 'icon',
            videoUrl: 'https://www.youtube.com/embed/DR-cfDsHCGA'
        });
        expect(actual).toEqual(jasmine.any(LessonModel));
    });
});
