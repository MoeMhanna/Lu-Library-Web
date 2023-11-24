import { Action, createReducer } from '@ngrx/store';
import { UserBo } from '../bo/user.bo';
import { HttpStatusEnum } from '../../shared/enums/http-status.enum';

export const DEFENDER_USERS_KEY = "defenderUsers";

export interface UsersState {
	usersBo: Array<UserBo>;
	error: string;
	status: HttpStatusEnum;
}

const usersInitialState: UsersState = {
  usersBo: null,
	error: null,
	status: HttpStatusEnum.pending
};

export const defenderUsersReducer = createReducer<UsersState, Action>(usersInitialState,

);
