import { Injectable } from '@angular/core';
import { ReviewsClient } from '../client/reviews.client';
import { map } from 'rxjs';
import * as _ from 'lodash';
import { ReviewsBo } from '../bo/reviews.bo';
import { ReviewsForCreationDto } from '../dto/reviews-for-creation.dto';
import { TotalStarsCountsBo } from '../bo/total-stars-counts.bo';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private reviewsClient: ReviewsClient) {
  }

  public getReviewsForOneBook(bookId: string) {
    return this.reviewsClient.getReviewsForOneBook(bookId)
      .pipe(
        map((reviewsList) => {
            return _.map(reviewsList, (reviewModel) => {
              return new ReviewsBo(reviewModel);
            })
          }
        )
      );
  }

  public createReview(bookId: string, userId: string, reviewsForCreationFormValue: any) {
    const reviewsForCreationDto =
      new ReviewsForCreationDto(reviewsForCreationFormValue, userId);
    return this.reviewsClient.createReview(bookId, reviewsForCreationDto);
  }

  public getTotalStarsLevelsPercentages() {
    return this.reviewsClient.getTotalStarsLevelsPercentages()
      .pipe(
        map((starCountsModel) => {
            return new TotalStarsCountsBo(starCountsModel);
          }
        )
      );
  }
}
