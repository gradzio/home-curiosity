import { NgModule } from '@angular/core';
import { AnswerBoxModule } from './answer-box/answer-box.module';
import { ProgressBarModule } from './progress-bar/progress-bar.module';

@NgModule({
    imports: [
        AnswerBoxModule,
        ProgressBarModule
    ],
    exports: [
        AnswerBoxModule,
        ProgressBarModule
    ]
})
export class PresentationComponentsModule { }
