import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SUBJECT_ROUTES } from './pages/subjects/subjects.routes';

const routes: Routes = [  
  {
    path: 'subjects/:subject',
    children: SUBJECT_ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
