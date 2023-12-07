import { createFeatureSelector, createSelector } from '@ngrx/store';
import { REVIEWS_KEY, ReviewsState } from './reviews.reducers';

export const selectReviews = createFeatureSelector<ReviewsState>(REVIEWS_KEY);
export const selectReviewsLoaded = createSelector(selectReviews, (state: ReviewsState) => state);
