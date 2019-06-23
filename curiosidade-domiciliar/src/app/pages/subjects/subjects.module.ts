import { NgModule } from '@angular/core';
import { LessonsComponent } from './lessons/lessons.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LessonsService } from './lessons/lessons.service';
import { RouterModule } from '@angular/router';
import { TopicsComponent } from './lessons/topics/topics.component';
import { MaterialModule } from 'src/app/material.module';
import { PresentationComponentsModule } from 'src/app/shared/presentation-components/presentation-components.module';
import { ExercisesService } from '../../shared/smart-components/exercises/exercises.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AnswersService } from '../../shared/smart-components/exercises/answers.service';
import { TimerService } from 'src/app/shared/services/timer.service';
import { ExercisesModule } from 'src/app/shared/smart-components/exercises/exercises.module';
import { TopicExerciseComponent } from './lessons/topics/topic-exercise/topic-exercise.component';

@NgModule({
    declarations: [
        LessonsComponent,
        TopicsComponent,
        TopicExerciseComponent
      ],
      imports: [
        RouterModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        PresentationComponentsModule,
        ExercisesModule
      ],
      providers: [LessonsService, ExercisesService, AnswersService, NotificationService, TimerService],
})
export class SubjectsModule { }
