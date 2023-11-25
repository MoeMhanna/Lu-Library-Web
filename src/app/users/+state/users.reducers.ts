import { Action, createReducer, on } from '@ngrx/store';
import { UserBo } from '../bo/user.bo';
import { HttpStatusEnum } from '../../shared/enums/http-status.enum';
import { usersAction } from './users.actions';

export const USERS_KEY = 'Users';

export interface UsersState {
  [USERS_KEY]: Array<UserBo>;
  error: string;
  status: HttpStatusEnum;
}

const usersInitialState: UsersState = {
  [USERS_KEY]: [],
  error: '',
  status: HttpStatusEnum.pending
};

export const UsersReducer = createReducer<UsersState, Action>(usersInitialState,
  on(usersAction.loadUsers, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(usersAction.loadUsersSuccess, (state: UsersState, {userList}) => {
    return {
      ...state,
      [USERS_KEY]: userList,
      status: HttpStatusEnum.success
    }
  }),
  on(usersAction.loadUsersError, (state: UsersState, {error}) => {
    return {
      ...state,
      error: error,
      status: HttpStatusEnum.error
    }
  }),

  on(usersAction.deleteUser, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(usersAction.deleteUserSuccess, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.removeSuccess
    }
  }),
  on(usersAction.deleteUserError, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.removeError
    }
  }),

  on(usersAction.createUser, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(usersAction.createUserSuccess, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.createSuccess
    }
  }),
  on(usersAction.createUserError, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.createError
    }
  })
)
