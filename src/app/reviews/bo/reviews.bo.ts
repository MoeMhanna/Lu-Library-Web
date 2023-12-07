import { ReviewsModel } from '../model/reviews.model';

export class ReviewsBo {
  id: string;
  bookId: string;
  review: string;
  username: string;
  starLevel: number;

  constructor(reviewsModel: ReviewsModel) {
    this.id = reviewsModel.id;
    this.bookId = reviewsModel.bookId;
    this.review = reviewsModel.review;
    this.username = reviewsModel.username;
    this.starLevel = reviewsModel.starLevel;
  }
}
