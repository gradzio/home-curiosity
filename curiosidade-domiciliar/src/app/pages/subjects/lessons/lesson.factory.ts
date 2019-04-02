import { LessonResponseContract } from './lessons.service';
import { LessonModel } from './lesson.model';

export class LessonFactory {
    public static make(object: LessonResponseContract): LessonModel {
        return new LessonModel(object.guid, object.name, object.icon, object.videoUrl);
    }
}