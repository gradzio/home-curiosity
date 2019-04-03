import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Grid } from './grid';

@NgModule({
    declarations: [
        Grid
    ],
    imports: [
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        Grid
    ]
})
export class GridModule { }
