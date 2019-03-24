import { NgModule } from '@angular/core';
import { ExercisesComponent } from './exercises.component';
import { PresentationComponentsModule } from '../../presentation-components/presentation-components.module';
import { CommonModule } from '@angular/common';
import { ExercisesService } from './exercises.service';
import { MaterialModule } from 'src/app/material.module';
import { NotificationService } from './notification.service';

@NgModule({
    declarations: [
        ExercisesComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        PresentationComponentsModule
    ],
    exports: [
        ExercisesComponent
    ],
    providers: [
        ExercisesService,
        NotificationService
      ]
})
export class ExercisesModule { }