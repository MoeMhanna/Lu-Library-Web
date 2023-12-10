import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReviewsActions } from '../+state/reviews.actions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenService } from '../../service/token.service';

@Component({
  templateUrl: 'review-upload-modal.html',
  styleUrls: ['review-upload-modal.scss']
})
export class ReviewUploadModal {
  public reviewForm: FormGroup;
  starsArray = [
    {value: 1, isMarked: false},
    {value: 2, isMarked: false},
    {value: 3, isMarked: false},
    {value: 4, isMarked: false},
    {value: 5, isMarked: false}
  ];

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private tokenService: TokenService,
              @Inject(MAT_DIALOG_DATA) public bookId: string) {
    this.reviewForm = this.formBuilder.group({
      comment: ['', Validators.required],
      starsLevel: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.store.dispatch(ReviewsActions.createReview({
      bookId: this.bookId,
      userId: this.tokenService.loggedInUserId,
      reviewsForCreationFormValue: this.reviewForm.value
    }));
  }

  markStar(idx: number) {
    this.starsArray.forEach((star, index) => {
      if (index <= idx) {
        star.isMarked = true;
      } else {
        star.isMarked = false;
      }
    });
    this.reviewForm.get('starsLevel').setValue(idx + 1);
  }
}
