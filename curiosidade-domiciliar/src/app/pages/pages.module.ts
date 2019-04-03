import { NgModule } from '@angular/core';
import { SubjectsModule } from './subjects/subjects.module';

@NgModule({
      imports: [
        SubjectsModule
      ],
      exports: [
          SubjectsModule
      ]
})
export class PagesModule { }
