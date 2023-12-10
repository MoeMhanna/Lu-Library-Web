import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BooksActions } from './books.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { BookService } from '../service/book.service';
import { BookBo } from '../bo/book.bo';


@Injectable()
export class BooksEffects {
  public $loadBooks = createEffect(() => this.actions$
    .pipe(
      ofType(BooksActions.loadBooks),
      switchMap((action) => {
        return this.bookService.getBooks()
          .pipe(
            map((BooksBoList: Array<BookBo>) => {
              return BooksActions.loadBooksSuccess({booksBoList: BooksBoList});
            }),
            catchError((error) => of(BooksActions.loadBooksError({error})))
          )
      })
    )
  );

  public $loadCategoryBooks = createEffect(() => this.actions$
    .pipe(
      ofType(BooksActions.loadCategoryBooks),
      switchMap((action) => {
        return this.bookService.getBooks(action.categoryId)
          .pipe(
            map((BooksBoList: Array<BookBo>) => {
              return BooksActions.loadCategoryBooksSuccess({booksBoList: BooksBoList});
            }),
            catchError((error) => of(BooksActions.loadCategoryBooksError({error})))
          )
      })
    )
  );

  public $createBook = createEffect(() => this.actions$
    .pipe(
      ofType(BooksActions.createBooks),
      switchMap((action) => {
        return this.bookService.createUser(action.bookForUploadFormValue, action.bookFile)
          .pipe(
            switchMap(() => [
              BooksActions.loadBooks(),
              BooksActions.loadCategoryBooks({categoryId: action.bookForUploadFormValue.category}),
              BooksActions.createBooksSuccess()
            ]),
            catchError((error) => {
              return of(BooksActions.createBooksError({error}));
            })
          )
      })
    )
  );

  constructor(private actions$: Actions,
              private bookService: BookService) {
  }
}
