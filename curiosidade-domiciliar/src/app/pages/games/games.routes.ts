import { GamesComponent } from './games.component';
import { CountGameResolver } from './game/count.resolver';
import { GameComponent } from './game/game.component';
import { ChoiceGameResolver } from './game/choice.resolver';

export const GAME_ROUTES = {
    path: 'games',
    children: [
        {
            path: '',
            component: GamesComponent
        },
        {
            path: 'count',
            component: GameComponent,
            resolve: {
                exercises: CountGameResolver
            }
        },
        {
            path: 'choice',
            component: GameComponent,
            resolve: {
                exercises: ChoiceGameResolver
            }
        }
    ]
  };
