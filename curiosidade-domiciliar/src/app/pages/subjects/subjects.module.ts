import { NgModule } from '@angular/core';
import { LessonsComponent } from './lessons/lessons.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LessonsService } from './lessons/lessons.service';
import { RouterModule } from '@angular/router';
import { LessonDetailComponent } from './lessons/lesson-detail/lesson-detail.component';
import { ExercisesComponent } from './lessons/lesson-detail/exercises/exercises.component';
import { MaterialModule } from 'src/app/material.module';
import { PresentationComponentsModule } from 'src/app/shared/presentation-components/presentation-components.module';
import { ExercisesService } from './lessons/lesson-detail/exercises/exercises.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AnswersService } from './lessons/lesson-detail/exercises/answers.service';

@NgModule({
    declarations: [
        LessonsComponent,
        LessonDetailComponent,
        ExercisesComponent
      ],
      imports: [
        RouterModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        PresentationComponentsModule,
      ],
      providers: [LessonsService, ExercisesService, AnswersService, NotificationService],
})
export class SubjectsModule { }