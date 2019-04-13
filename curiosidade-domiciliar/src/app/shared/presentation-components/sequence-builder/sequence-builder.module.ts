import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SequenceBuilder } from './sequence-builder';
import { MatButton } from '@angular/material';

@NgModule({
    entryComponents: [ MatButton ],
    declarations: [
        SequenceBuilder
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule
    ],
    exports: [
        SequenceBuilder
    ]
})
export class SequenceBuilderModule { }
