import { AnswerBox } from './answer-box';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
    declarations: [
        AnswerBox
    ],
    imports: [
        MaterialModule
    ],
    exports: [
        AnswerBox
    ]
})
export class AnswerBoxModule { }