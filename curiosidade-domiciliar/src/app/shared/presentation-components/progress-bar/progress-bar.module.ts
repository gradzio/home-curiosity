import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { ProgressBar } from './progress-bar';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        ProgressBar
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        ProgressBar
    ]
})
export class ProgressBarModule { }
