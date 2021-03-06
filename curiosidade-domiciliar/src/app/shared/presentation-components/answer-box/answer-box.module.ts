import { AnswerBox } from './answer-box';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SequenceBuilderModule } from '../sequence-builder/sequence-builder.module';

@NgModule({
    declarations: [
        AnswerBox
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        SequenceBuilderModule
    ],
    exports: [
        AnswerBox,
        SequenceBuilderModule
    ]
})
export class AnswerBoxModule { }
