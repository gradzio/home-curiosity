import { ExerciseModel } from './exercise.model';

describe('ExerciseModel', () => {
    it('should create', () => {
        const exercise = new ExerciseModel('guid', 'content', 'type');
        expect(exercise.guid).toEqual('guid');
        expect(exercise.content).toEqual('content');
        expect(exercise.choices.length).toEqual(0);
    });

    it('should create with choices', () => {
        const exercise = new ExerciseModel(
            'guid',
            'content',
            'type',
            [{label: '1', value: '1'}, {label: '2', value: '2'}, {label: '3', value: '3'}]
        );
        expect(exercise.choices.length).toEqual(3);
        expect(exercise.choices[0].label).toEqual('1');
        expect(exercise.choices[1].label).toEqual('2');
        expect(exercise.choices[2].label).toEqual('3');
        expect(exercise.choices[0].value).toEqual('1');
        expect(exercise.choices[1].value).toEqual('2');
        expect(exercise.choices[2].value).toEqual('3');
    });

    it('should create content config', () => {
        const exercise = new ExerciseModel(
            'guid',
            'content',
            'type',
            [],
            { min: 1, max: 10}
        );

        expect(exercise.contentConfig.min).toEqual(1);
        expect(exercise.contentConfig.max).toEqual(10);
    });

    it('should compare as false', () => {
        const exercise1 = new ExerciseModel('guid1', 'conten1', 'RADIO');
        const exercise2 = new ExerciseModel('guid2', 'content2', 'INPUT');

        expect(exercise1.isEqual(exercise2)).toEqual(false);
    });

    it('should compare as true', () => {
        const exercise1 = new ExerciseModel('guid1', 'content1', 'RADIO');
        const exercise2 = new ExerciseModel('guid1', 'content1', 'INPUT');

        expect(exercise1.isEqual(exercise2)).toEqual(true);
    });


});
