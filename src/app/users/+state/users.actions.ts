import { createActionGroup, props } from '@ngrx/store';
import { UserBo } from '../bo/user.bo';

export const usersAction = createActionGroup({
  source: 'users Accounts',
  events: {
    'load users': props<{ selectedUserId?: string }>(),
    'load users success': props<{ userList: Array<UserBo> }>(),
    'load users error': props<{ error: string }>(),
  }
})
