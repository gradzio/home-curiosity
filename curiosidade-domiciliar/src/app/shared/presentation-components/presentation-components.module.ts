import { NgModule } from '@angular/core';
import { AnswerBoxModule } from './answer-box/answer-box.module';
import { ProgressBarModule } from './progress-bar/progress-bar.module';
import { GridModule } from '@angular/flex-layout';
import { IconButtonModule } from './icon-button/icon-button.module';
import { VideoCardModule } from './video-card/video-card.module';
import { SequenceBuilderModule } from './sequence-builder/sequence-builder.module';
import { QuestionContentModule } from './question-content/question-content.module';

@NgModule({
    imports: [
        AnswerBoxModule,
        ProgressBarModule,
        GridModule,
        IconButtonModule,
        QuestionContentModule
    ],
    exports: [
        AnswerBoxModule,
        ProgressBarModule,
        GridModule,
        IconButtonModule,
        VideoCardModule,
        QuestionContentModule
    ]
})
export class PresentationComponentsModule { }
