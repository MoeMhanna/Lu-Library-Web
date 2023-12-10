import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StartsActions } from './starts.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ReviewService } from '../../services/review.service';

@Injectable()
export class StarsEffects {
  public $loadTotalStarsLevelsPercentages = createEffect(() => this.actions$
    .pipe(
      ofType(StartsActions.loadTotalStarsLevelsPercentages),
      switchMap((action) => {
        return this.reviewService.getTotalStarsLevelsPercentages()
          .pipe(
            map((totalStarsCountsBo) => {
              return StartsActions.loadTotalStarsLevelsPercentagesSuccess({totalStarsCountsBo});
            }),
            catchError((error) => of(StartsActions.loadTotalStarsLevelsPercentagesError({error})))
          )
      })
    )
  );

  constructor(private actions$: Actions,
              private reviewService: ReviewService) {
  }
}
