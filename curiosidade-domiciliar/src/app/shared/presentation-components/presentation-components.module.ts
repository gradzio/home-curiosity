import { NgModule } from '@angular/core';
import { AnswerBoxModule } from './answer-box/answer-box.module';
import { ProgressBarModule } from './progress-bar/progress-bar.module';
import { GridModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        AnswerBoxModule,
        ProgressBarModule,
        GridModule
    ],
    exports: [
        AnswerBoxModule,
        ProgressBarModule,
        GridModule
    ]
})
export class PresentationComponentsModule { }
