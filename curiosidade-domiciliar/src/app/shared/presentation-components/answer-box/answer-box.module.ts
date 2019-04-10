import { AnswerBox } from './answer-box';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        AnswerBox
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule
    ],
    exports: [
        AnswerBox
    ]
})
export class AnswerBoxModule { }
