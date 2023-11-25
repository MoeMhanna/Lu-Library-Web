import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserBo } from '../bo/user.bo';

export const usersAction = createActionGroup({
  source: 'users Accounts',
  events: {
    'load users': emptyProps(),
    'load users success': props<{ userList: Array<UserBo> }>(),
    'load users error': props<{ error: string }>(),

    'load user by id': props<{ selectedUserId: string }>(),
    'load user by id success': props<{ user: UserBo }>(),
    'load user by id error': props<{ error: string }>(),

    'delete User': props<{ id: string }>(),
    'delete User Success': emptyProps(),
    'delete User Error': props<{ error: string }>(),

    'create User': props<{ user: UserBo }>(),
    'create User Success': emptyProps(),
    'create User Error ': props<{ error: string }>(),
  }
})
