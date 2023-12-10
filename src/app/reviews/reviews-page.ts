import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectReviewsLoaded } from './+state/reviews.selectors';
import { ReviewsActions } from './+state/reviews.actions';
import { REVIEWS_KEY } from './+state/reviews.reducers';
import { ReviewUploadModal } from './add-review/review-upload-modal';

@Component({
  selector: 'books-reviews',
  templateUrl: './reviews-page.html',
  styleUrl: './reviews-page.scss'
})
export class ReviewsPage implements OnInit, OnDestroy {
  @Input() public bookId: string;
  public reviewsState$ = this.store.select(selectReviewsLoaded);
  protected readonly REVIEWS_KEY = REVIEWS_KEY;

  constructor(private matDialog: MatDialog,
              public store: Store) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.store.dispatch(ReviewsActions.loadReviews({bookId: this.bookId}))
  }

  presentAddCommentModal() {
    this.matDialog.open(ReviewUploadModal, {
      data: this.bookId
    });
  }
}
