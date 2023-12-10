export class ReviewsForCreationDto {
  review: string;
  starsLevel: number;
  userId: string;

  constructor(reviewFormValue: any, userId: string) {
    this.review = reviewFormValue.comment;
    this.starsLevel = reviewFormValue.starsLevel;
    this.userId = userId;
  }

  toJSON() {
    return {
      review: this.review,
      userId: this.userId,
      starsLevel: this.starsLevel
    };
  }
}
