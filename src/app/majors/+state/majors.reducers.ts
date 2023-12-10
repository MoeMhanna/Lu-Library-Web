import { HttpStatusEnum } from '../../shared/enums/http-status.enum';
import { Action, createReducer, on } from '@ngrx/store';
import { MajorsActions } from './majors.actions';
import { MajorsBo } from '../bo/majors.bo';

export const MAJORS_KEY = 'majors';

export interface MajorsState {
  [MAJORS_KEY]: Array<MajorsBo>;
  error: string;
  status: HttpStatusEnum;
}

const majorsInitialState: MajorsState = {
  [MAJORS_KEY]: null,
  error: null,
  status: HttpStatusEnum.pending
};

export const MajorsReducers = createReducer<MajorsState, Action>(majorsInitialState,
  on(MajorsActions.loadMajors, (state: MajorsState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(MajorsActions.loadMajorsSuccess, (state: MajorsState, {majorsBoList}) => {
    return {
      ...state,
      [MAJORS_KEY]: majorsBoList,
      status: HttpStatusEnum.success
    }
  }),
  on(MajorsActions.loadMajorsError, (state: MajorsState, {error}) => {
    return {
      ...state,
      error: error,
      status: HttpStatusEnum.error
    }
  }),
  on(MajorsActions.createMajors, (state: MajorsState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(MajorsActions.createMajorsSuccess, (state: MajorsState) => {
    return {
      ...state,
      status: HttpStatusEnum.success
    }
  }),
  on(MajorsActions.createMajorsError, (state: MajorsState, {error}) => {
    return {
      ...state,
      error: error,
      status: HttpStatusEnum.error
    }
  }),
  on(MajorsActions.deleteMajors, (state: MajorsState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(MajorsActions.deleteMajorsSuccess, (state: MajorsState) => {
    return {
      ...state,
      status: HttpStatusEnum.success
    }
  }),
  on(MajorsActions.deleteMajorsError, (state: MajorsState, {error}) => {
    return {
      ...state,
      error: error,
      status: HttpStatusEnum.error
    }
  })
)
