import { TopicModel } from './topic.model';

describe('TopiModel', () => {
    let topic;
    beforeEach(() => {
        topic = new TopicModel('guid', 'name', 'videourl', null, false);
    });

    it('should create', () => {
        expect(topic.guid).toEqual('guid');
        expect(topic.name).toEqual('name');
        expect(topic.videoUrl).toEqual('videourl');
        expect(topic.exerciseGuid).toBeNull();
        expect(topic.isCompleted).toEqual(false);
    });

    it('should complete', () => {
        topic.complete();

        expect(topic.isCompleted).toBe(true);
    });
});
