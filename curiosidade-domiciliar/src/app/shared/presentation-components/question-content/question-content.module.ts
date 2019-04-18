import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionContent } from './question-content';

@NgModule({
    declarations: [
        QuestionContent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        QuestionContent
    ]
})
export class QuestionContentModule { }
