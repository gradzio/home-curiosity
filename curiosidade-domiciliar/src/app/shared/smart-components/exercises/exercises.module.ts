import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButton } from '@angular/material';
import { ExercisesComponent } from './exercises.component';
import { PresentationComponentsModule } from '../../presentation-components/presentation-components.module';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ExercisesService } from 'src/app/shared/smart-components/exercises/exercises.service';
import { AnswersService } from 'src/app/shared/smart-components/exercises/answers.service';

@NgModule({
    entryComponents: [ MatButton ],
    declarations: [
        ExercisesComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        PresentationComponentsModule
    ],
    exports: [
        ExercisesComponent
    ],
    providers: [
        NotificationService, ExercisesService, AnswersService
    ]
})
export class ExercisesModule { }
