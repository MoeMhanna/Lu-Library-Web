import { createFeatureSelector, createSelector } from '@ngrx/store';
import { STARS_KEY, StarsReducersState } from './stars-reducers-state';

export const selectReviews = createFeatureSelector<StarsReducersState>(STARS_KEY);
export const selectReviewsLoaded = createSelector(selectReviews, (state: StarsReducersState) => state);
