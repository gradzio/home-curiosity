import { LessonModel } from './lesson.model';
import { LessonFactory } from './lesson.factory';
import { Collection } from 'src/app/core/collection';

describe('LessonFactory', () => {
    it('should make object', () => {
        const actual = LessonFactory.make({
            guid: 'lessonguid1',
            name: 'name',
            icon: 'icon',
            isCompleted: false,
            topics: [
                {guid: 'topicguid1', name: 'topicname1', videoUrl: 'videoUrl1'},
                {guid: 'topicguid2', name: 'topicname2', videoUrl: 'videoUrl2'}
            ]
        });
        expect(actual).toEqual(jasmine.any(LessonModel));
        expect(actual.topics).toEqual(jasmine.any(Collection));
        expect(actual.topics.length).toEqual(2);
    });
});
