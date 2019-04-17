import { Option } from 'src/app/shared/presentation-components/answer-box/option.interface';

export enum ExercisePresentation {
    INPUT,
    RADIO,
    SEQUENCE
}

export class ExerciseModel {
    constructor(private _guid: string, private _content: string, private _type: string, private _choices = []) {}

    isEqual(exercise: ExerciseModel): boolean {
        return this._guid === exercise.guid
            && this._content === exercise.content;
    }

    get guid(): string {
        return this._guid;
    }

    get content(): string {
        return this._content;
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
