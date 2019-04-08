import { LessonModel } from 'src/app/pages/subjects/lessons/lesson.model';
import { LessonFactory } from 'src/app/pages/subjects/lessons/lesson.factory';

export const LessonsProvider = {
    two: [
        LessonFactory.make({
            guid: 'guid1', name: 'name1', icon: 'icon1',
            topics: [
                { guid: 'topicGuid1', name: 'topicname1', videoUrl: 'videoUrl1', isCompleted: false },
                { guid: 'topicguid1', name: 'topicname2', videoUrl: 'videoUrl2', isCompleted: false }
            ]
        }),
        LessonFactory.make({
            guid: 'guid2', name: 'name2', icon: 'icon2',
            topics: [
                { guid: 'topicGuid3', name: 'topicname3', videoUrl: 'videoUrl3', isCompleted: false },
                { guid: 'topicguid4', name: 'topicname4', videoUrl: 'videoUrl4', isCompleted: false }
            ]
        })
    ]
};
