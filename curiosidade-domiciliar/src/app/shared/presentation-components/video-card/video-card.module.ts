import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VideoCard } from './video-card';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        VideoCard
    ],
    imports: [
        RouterModule,
        CommonModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        VideoCard
    ]
})
export class VideoCardModule { }
