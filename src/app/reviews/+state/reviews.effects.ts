import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReviewsActions } from './reviews.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ReviewService } from '../services/review.service';
import { ReviewsBo } from '../bo/reviews.bo';

@Injectable()
export class ReviewsEffects {
  public $loadReviews = createEffect(() => this.actions$
    .pipe(
      ofType(ReviewsActions.loadReviews),
      switchMap((action) => {
        return this.reviewService.getReviewsForOneBook(action.bookId)
          .pipe(
            map((reviewsBoList: Array<ReviewsBo>) => {
              return ReviewsActions.loadReviewsSuccess({reviewsBoList});
            }),
            catchError((error) => of(ReviewsActions.loadReviewsError({error})))
          )
      })
    )
  );

  public $createReview = createEffect(() => this.actions$
    .pipe(
      ofType(ReviewsActions.createReview),
      switchMap((action) => {
        return this.reviewService.createReview(action.bookId, action.userId, action.reviewsForCreationFormValue)
          .pipe(
            switchMap(() => [
              ReviewsActions.loadReviews({bookId: action.bookId, stringId: action.bookId}),
              ReviewsActions.createReviewSuccess()
            ]),
            catchError((error) => {
              return of(ReviewsActions.createReviewError({error}));
            })
          )
      })
    )
  );

  public $loadTotalStarsLevelsPercentages = createEffect(() => this.actions$
    .pipe(
      ofType(ReviewsActions.loadTotalStarsLevelsPercentages),
      switchMap((action) => {
        return this.reviewService.getTotalStarsLevelsPercentages()
          .pipe(
            map((totalStarsCountsBo) => {
              return ReviewsActions.loadTotalStarsLevelsPercentagesSuccess({totalStarsCountsBo});
            }),
            catchError((error) => of(ReviewsActions.loadTotalStarsLevelsPercentagesError({error})))
          )
      })
    )
  );

  constructor(private actions$: Actions,
              private reviewService: ReviewService) {
  }
}
