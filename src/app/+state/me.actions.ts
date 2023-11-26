import { createActionGroup, props } from '@ngrx/store';
import { UserBo } from '../users/bo/user.bo';

export const MeActions = createActionGroup({
  source: 'Me',
  events: {
    'load me': props<{ user: UserBo }>(),
    'load me success': props<{ user: any }>(),
    'load me error': props<{ error: string }>(),
  }
})
