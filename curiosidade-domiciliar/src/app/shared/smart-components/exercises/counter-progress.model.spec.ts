import { CounterProgressModel } from './counter-progress.model';

describe('CounterProgressModel', () => {
    it('should create default', () => {
        const model = new CounterProgressModel();
        expect(model).toEqual(jasmine.objectContaining({
            percentage: 0,
            label: '',
            isCompleted: false
        }));
    });

    it('should create intermediate', () => {
        const model = new CounterProgressModel(5, 10);
        expect(model).toEqual(jasmine.objectContaining({
            percentage: 50,
            label: '5',
            isCompleted: false
        }));
    });

    it('should create rounded down intermediate', () => {
        const model = new CounterProgressModel(6, 9);
        expect(model).toEqual(jasmine.objectContaining({
            percentage: 33,
            label: '6',
            isCompleted: false
        }));
    });

    it('should create completed', () => {
        const model = new CounterProgressModel(0, 10);
        expect(model).toEqual(jasmine.objectContaining({
            percentage: 100,
            label: '0',
            isCompleted: true
        }));
    });
});
