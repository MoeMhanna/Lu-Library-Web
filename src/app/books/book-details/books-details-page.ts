import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectBookDetailsLoaded } from '../+state/books-details/books-details.selectors';
import { BooksDetailsActions } from '../+state/books-details/books-details.actions';
import { BOOK_DETAILS_KEY } from '../+state/books-details/books-details.reducers';
import { BookBo } from '../bo/book.bo';
import { lastValueFrom, Subscription } from 'rxjs';
import { BookService } from '../service/book.service';
import { HttpStatusEnum } from '../../shared/enums/http-status.enum';

@Component({
  templateUrl: './books-details-page.html',
  styleUrl: './books-details-page.scss'
})
export class BooksDetailsPage implements OnInit, OnDestroy {
  public bookDetailsState$ = this.store.select(selectBookDetailsLoaded);
  public bookDetails: BookBo;
  private subscription = new Subscription();

  constructor(private matDialogRef: MatDialogRef<BooksDetailsPage>,
              public bookService: BookService,
              @Inject(MAT_DIALOG_DATA) public data: string,
              public store: Store) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public async downloadBook() {
    await lastValueFrom(this.bookService.downloadBookById(this.data));
  }

  ngOnInit(): void {
    this.bookDetailsSubscription();
    this.store.dispatch(BooksDetailsActions.loadBookDetails({bookId: this.data}));
  }

  private bookDetailsSubscription() {
    const bookDetailsSubscription$ = this.bookDetailsState$
      .subscribe((bookDetailsState) => {
        console.log(bookDetailsState);
        if (bookDetailsState.status === HttpStatusEnum.success) {
          this.bookDetails = bookDetailsState[BOOK_DETAILS_KEY];
        }
      });
    this.subscription.add(bookDetailsSubscription$);
  }
}
