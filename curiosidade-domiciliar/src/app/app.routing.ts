import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SUBJECT_ROUTES } from './pages/subjects/subjects.routes';
import { GAME_ROUTES } from './pages/games/games.routes';

const routes: Routes = [
  SUBJECT_ROUTES,
  GAME_ROUTES
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
