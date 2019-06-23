import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { PresentationComponentsModule } from 'src/app/shared/presentation-components/presentation-components.module';
import { GamesComponent } from './games.component';
import { GameComponent } from './game/game.component';
import { ExercisesModule } from 'src/app/shared/smart-components/exercises/exercises.module';

@NgModule({
    declarations: [
        GamesComponent,
        GameComponent
      ],
      imports: [
        RouterModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        PresentationComponentsModule,
        ExercisesModule
      ]
})
export class GamesModule { }
