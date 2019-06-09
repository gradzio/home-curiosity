import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButton } from '@angular/material';
import { ExercisesComponent } from './exercises.component';

@NgModule({
    entryComponents: [ MatButton ],
    declarations: [
        ExercisesComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule
    ],
    exports: [
        ExercisesComponent
    ]
})
export class ExercisesModule { }
