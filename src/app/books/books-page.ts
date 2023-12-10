import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookUploadModal } from './book-upload-modal/book-upload-modal';
import { ActionButtonInterface } from '../shared/components/action-button/interface/action-button.interface';
import { Store } from '@ngrx/store';
import { BooksActions } from './+state/books.actions';
import { BooksDetailsPage } from './book-details/books-details-page';
import { ActivatedRoute } from '@angular/router';
import { selectBooksLoaded } from './+state/books.selectors';
import { BOOKS_KEY } from './+state/books.reducers';

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
  BOOKS_KEY = BOOKS_KEY;
  public booksState$ = this.store.select(selectBooksLoaded);

  constructor(private matDialog: MatDialog,
              private route: ActivatedRoute,
              public store: Store) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    let major = '';
    this.route.paramMap.subscribe(params => {
      major = params.get('major');
    });
    if (major) {
      this.store.dispatch(BooksActions.loadCategoryBooks({categoryId: major}));
    } else {
      this.store.dispatch(BooksActions.loadBooks());
    }
  }

  presentBookDetails(id: string) {
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
