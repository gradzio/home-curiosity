import { GamesComponent } from './games.component';
import { ExercisesComponent } from '../../shared/smart-components/exercises/exercises.component';
import { CountResolver } from '../../shared/smart-components/exercises/count.resolver';

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
