import { Option } from 'src/app/shared/presentation-components/answer-box/option.interface';

export enum ExercisePresentation {
    INPUT,
    RADIO,
    SEQUENCE
}

export class ExerciseModel {
    constructor(private _guid: string, private _title: string, private _imageUrl: string, private _type: string, private _choices = []) {}

    isEqual(exercise: ExerciseModel): boolean {
        return this._guid === exercise.guid
            && this._title === exercise.title
            && this._imageUrl === exercise.imageUrl;
    }

    get guid(): string {
        return this._guid;
    }

    get title(): string {
        return this._title;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    get choices(): Option[] {
        return this._choices;
    }

    get isInput(): boolean {
        return ExercisePresentation[this._type] === ExercisePresentation.INPUT;
    }

    get isRadio(): boolean {
        return ExercisePresentation[this._type] === ExercisePresentation.RADIO;
    }

    get isSequence(): boolean {
        return ExercisePresentation[this._type] === ExercisePresentation.SEQUENCE;
    }
}
