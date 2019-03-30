import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconButton } from './icon-button';

@NgModule({
    declarations: [
        IconButton
    ],
    imports: [
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        IconButton
    ]
})
export class IconButtonModule { }
