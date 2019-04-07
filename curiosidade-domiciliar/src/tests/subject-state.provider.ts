import { LessonsProvider } from './lessons.provider';

export const SubjectStateProvider = {
    EMPTY_LESSONS: {
      subject: {
        subject: { name: 'empty subject'},
        lessons: []
      }
    },
    TWO_LESSONS: {
      subject: {
        subject: { name: 'two lessons subject'},
        lessons: LessonsProvider.two
      }
    },
    TWO_LESSONS_FIRST_SELECTED: {
      subject: {
        lessons: LessonsProvider.two,
        selectedLesson: LessonsProvider.two[0]
     }
    }
};
