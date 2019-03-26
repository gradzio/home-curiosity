import { NgModule } from '@angular/core';
import { AnswerBoxModule } from './answer-box/answer-box.module';

@NgModule({
    imports: [
        AnswerBoxModule
    ],
    exports: [
        AnswerBoxModule
    ]
})
export class PresentationComponentsModule { }
