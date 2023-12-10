import { Action, createReducer, on } from '@ngrx/store';
import { StartsActions } from './starts.actions';
import { TotalStarsCountsBo } from '../../bo/total-stars-counts.bo';
import { HttpStatusEnum } from '../../../shared/enums/http-status.enum';

export const STARS_KEY = 'stars';

export interface StarsReducersState {
  [STARS_KEY]: TotalStarsCountsBo;
  error: string;
  status: HttpStatusEnum;
}

const starsReducersInitialState: StarsReducersState = {
  [STARS_KEY]: null,
  error: null,
  status: HttpStatusEnum.pending
};

export const StarsReducers = createReducer<StarsReducersState, Action>(starsReducersInitialState,
  on(StartsActions.loadTotalStarsLevelsPercentages, (state: StarsReducersState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(StartsActions.loadTotalStarsLevelsPercentagesSuccess, (state: StarsReducersState, {totalStarsCountsBo}) => {
    return {
      ...state,
      [STARS_KEY]: totalStarsCountsBo,
      status: HttpStatusEnum.success
    }
  }),
  on(StartsActions.loadTotalStarsLevelsPercentagesError, (state: StarsReducersState, {error}) => {
    return {
      ...state,
      error: error,
      status: HttpStatusEnum.error
    }
  })
)
