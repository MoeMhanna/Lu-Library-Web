import { UserBo } from '../users/bo/user.bo';
import { HttpStatusEnum } from '../shared/enums/http-status.enum';
import { Action, createReducer, on } from '@ngrx/store';
import { MeActions } from './me.actions';

export const ME_KEY = 'meUser';

export interface MeState {
  [ME_KEY]: UserBo | null;
  error: string | null;
  status: HttpStatusEnum;
}

const meInitialState: MeState = {
  [ME_KEY]: null,
  error: null,
  status: HttpStatusEnum.pending
};

export const meReducer = createReducer<MeState, Action>(meInitialState,
  on(MeActions.loadMe, (state: MeState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    };
  }),
  on(MeActions.loadMeSuccess, (state: MeState, {user}) => {
    return {
      ...state,
      [ME_KEY]: user,
      status: HttpStatusEnum.success
    };
  }),
  on(MeActions.loadMeError, (state: MeState, {error}) => {
    return {
      ...state,
      userAccountsDetailsState: error,
      status: HttpStatusEnum.error
    };
  }),

  on(MeActions.clearMe, (state: MeState) => {
    return meInitialState
  })
);
