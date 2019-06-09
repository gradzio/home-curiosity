import { GamesComponent } from './games.component';
import { ExercisesComponent } from '../subjects/lessons/topics/exercises/exercises.component';
import { CountResolver } from './count/count.resolver';

export const GAME_ROUTES = {
    path: 'games',
    children: [
        {
            path: '',
            component: GamesComponent
        },
        {
            path: 'count',
            component: ExercisesComponent,
            resolve: {
                exercises: CountResolver
            }
        }
    ]
  };
