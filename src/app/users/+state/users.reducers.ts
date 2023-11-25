import { Action, createReducer, on } from '@ngrx/store';
import { UserBo } from '../bo/user.bo';
import { HttpStatusEnum } from '../../shared/enums/http-status.enum';
import { UsersAction } from './users.actions';

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
  on(UsersAction.loadUsers, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(UsersAction.loadUsersSuccess, (state: UsersState, {userList}) => {
    return {
      ...state,
      [USERS_KEY]: userList,
      status: HttpStatusEnum.success
    }
  }),
  on(UsersAction.loadUsersError, (state: UsersState, {error}) => {
    return {
      ...state,
      error: error,
      status: HttpStatusEnum.error
    }
  }),

  on(UsersAction.deleteUser, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(UsersAction.deleteUserSuccess, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.removeSuccess
    }
  }),
  on(UsersAction.deleteUserError, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.removeError
    }
  }),

  on(UsersAction.createUser, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(UsersAction.createUserSuccess, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.createSuccess
    }
  }),
  on(UsersAction.createUserError, (state: UsersState) => {
    return {
      ...state,
      status: HttpStatusEnum.createError
    }
  })
)
