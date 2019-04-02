import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconButton } from './icon-button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        IconButton
    ],
    imports: [
        RouterModule,
        CommonModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        IconButton
    ]
})
export class IconButtonModule { }
