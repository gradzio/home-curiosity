import { NgModule } from '@angular/core';
import { SubjectsModule } from './subjects/subjects.module';
import { GamesModule } from './games/games.module';

@NgModule({
      imports: [
        SubjectsModule,
        GamesModule
      ],
      exports: [
          SubjectsModule,
          GamesModule
      ]
})
export class PagesModule { }
