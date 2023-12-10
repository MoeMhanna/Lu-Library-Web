import { ReviewsBo } from '../bo/reviews.bo';
import { HttpStatusEnum } from '../../shared/enums/http-status.enum';
import { Action, createReducer, on } from '@ngrx/store';
import { ReviewsActions } from './reviews.actions';

export const REVIEWS_KEY = 'reviews';

export interface ReviewsState {
  [REVIEWS_KEY]: Array<ReviewsBo>;
  error: string;
  status: HttpStatusEnum;
}

const reviewsInitialState: ReviewsState = {
  [REVIEWS_KEY]: null,
  error: null,
  status: HttpStatusEnum.pending
};

export const ReviewsReducer = createReducer<ReviewsState, Action>(reviewsInitialState,
  on(ReviewsActions.loadReviews, (state: ReviewsState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(ReviewsActions.loadReviewsSuccess, (state: ReviewsState, {reviewsBoList}) => {
    return {
      ...state,
      [REVIEWS_KEY]: reviewsBoList,
      status: HttpStatusEnum.success
    }
  }),
  on(ReviewsActions.loadReviewsError, (state: ReviewsState, {error}) => {
    return {
      ...state,
      error: error,
      status: HttpStatusEnum.error
    }
  }),
  on(ReviewsActions.createReview, (state: ReviewsState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(ReviewsActions.createReviewSuccess, (state: ReviewsState) => {
    return {
      ...state,
      status: HttpStatusEnum.success
    }
  }),
  on(ReviewsActions.createReviewError, (state: ReviewsState, {error}) => {
    return {
      ...state,
      error: error,
      status: HttpStatusEnum.error
    }
  }),
)
