import { NgModule } from '@angular/core';
import { ExercisesComponent } from './exercises.component';
import { PresentationComponentsModule } from '../../presentation-components/presentation-components.module';
import { CommonModule } from '@angular/common';
import { ExercisesService } from './exercises.service.stub';
import { MaterialModule } from 'src/app/material.module';

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
        ExercisesService
      ]
})
export class ExercisesModule { }