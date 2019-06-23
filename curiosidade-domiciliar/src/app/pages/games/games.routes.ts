import { GamesComponent } from './games.component';
import { CountResolver } from './count/count.resolver';
import { CountGameComponent } from './count/count.component';

export const GAME_ROUTES = {
    path: 'games',
    children: [
        {
            path: '',
            component: GamesComponent
        },
        {
            path: 'count',
            component: CountGameComponent,
            resolve: {
                exercises: CountResolver
            }
        }
    ]
  };
