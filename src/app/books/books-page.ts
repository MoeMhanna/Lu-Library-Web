import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookUploadModal } from './book-upload-modal/book-upload-modal';
import { ActionButtonInterface } from '../shared/components/action-button/interface/action-button.interface';
import { Store } from '@ngrx/store';
import { selectBooksLoaded } from './+state/books.selectors';
import { BooksActions } from './+state/books.actions';
import { BooksDetailsPage } from './book-details/books-details-page';

@Component({
  templateUrl: './books-page.html',
  styleUrl: './books-page.scss'
})
export class BooksPage implements OnInit, OnDestroy {
  public createBookAction: ActionButtonInterface = {
    faIcon: ['fas', 'plus-circle'],
    label: 'Upload Book', handler: () => {
      this.bookUploadModal();
    }
  };
  public booksState$ = this.store.select(selectBooksLoaded);

  constructor(private matDialog: MatDialog,
              public store: Store) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.store.dispatch(BooksActions.loadBooks())
  }

  presentBookDetails(id: string) {
    console.log(id);
    this.matDialog.open(BooksDetailsPage, {
      width: '100%',
      height: '100%',
      data: id
    });
  }

  private bookUploadModal() {
    this.matDialog.open(BookUploadModal);
  }
}
