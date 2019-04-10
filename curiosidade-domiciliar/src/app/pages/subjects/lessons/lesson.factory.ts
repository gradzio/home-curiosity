import { LessonModel } from './lesson.model';
import { TopicModel } from './topics/topic.model';
import { Collection } from 'src/app/core/collection';

export class LessonFactory {
    public static make(object: any): LessonModel {
        const lessonModel = new LessonModel(object.guid, object.name, object.icon, object.isCompleted);
        lessonModel.topics = new Collection(object.topics.map(topic => new TopicModel(topic.guid, topic.name, topic.videoUrl)));
        return lessonModel;
    }
}
