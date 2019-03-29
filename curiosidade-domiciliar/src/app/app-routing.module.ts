import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { LessonsResolver } from './pages/lessons/lessons.resolver';

const routes: Routes = [  
  {
    path: 'subjects/:subject',
    component: LessonsComponent,
    resolve: {
      lessons: LessonsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
