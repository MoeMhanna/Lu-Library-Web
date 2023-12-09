import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BooksDetailsActions } from './books-details.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { BookService } from '../../service/book.service';
import { BookBo } from '../../bo/book.bo';

@Injectable()
export class BooksDetailsEffects {
  public $loadBooks = createEffect(() => this.actions$
    .pipe(
      ofType(BooksDetailsActions.loadBookDetails),
      switchMap((action) => {
        return this.bookService.getBookById(action.bookId)
          .pipe(
            map((bookBo: BookBo) => {
              console.log(bookBo);
              return BooksDetailsActions.loadBooksDetailsSuccess({booksBo: bookBo});
            }),
            catchError((error) => of(BooksDetailsActions.loadBooksDetailsError({error})))
          )
      })
    )
  );

  constructor(private actions$: Actions,
              private bookService: BookService) {
  }
}
