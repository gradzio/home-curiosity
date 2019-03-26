import { NgModule } from '@angular/core';
import { ExercisesModule } from './exercises/exercises.module';
import { PresentationComponentsModule } from '../presentation-components/presentation-components.module';

@NgModule({
    imports: [
        ExercisesModule
    ],
    exports: [
        ExercisesModule
    ]
})
export class SmartComponentsModule { }
