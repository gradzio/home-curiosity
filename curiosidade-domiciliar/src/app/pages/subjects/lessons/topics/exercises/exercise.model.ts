import { Option } from 'src/app/shared/presentation-components/answer-box/option.interface';
import { QuestionContentConfig } from 'src/app/shared/presentation-components/question-content/question-content.interface';

export enum ExercisePresentation {
    INPUT,
    RADIO,
    SEQUENCE
}

export class ExerciseModel {
    private _math = Math;
    constructor(
        private _guid: string, private _content: string, private _type: string, private _choices = [], private _contentConfig = null
    ) {}

    isEqual(exercise: ExerciseModel): boolean {
        return this._guid === exercise.guid
            && this._content === exercise.content;
    }

    *generate(): IterableIterator<ExerciseModel> {
        const contentConfig = this._contentConfig ? Object.assign({}, this._contentConfig) : null;
        yield new ExerciseModel(this._guid, this._content, this._type, this._shuffleArray(this._choices), contentConfig);
    }

    private _shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = this._math.floor(this._math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
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

    get contentConfig(): QuestionContentConfig {
        return this._contentConfig;
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
