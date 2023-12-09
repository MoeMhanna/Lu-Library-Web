import { HttpStatusEnum } from '../../shared/enums/http-status.enum';
import { Action, createReducer, on } from '@ngrx/store';
import { BooksActions } from './books.actions';
import { BookBo } from '../bo/book.bo';

export const BOOKS_KEY = 'books';

export interface BooksState {
  [BOOKS_KEY]: Array<BookBo>;
  error: string;
  status: HttpStatusEnum;
}

const BooksInitialState: BooksState = {
  [BOOKS_KEY]: null,
  error: null,
  status: HttpStatusEnum.pending
};

export const BooksReducer = createReducer<BooksState, Action>(BooksInitialState,
  on(BooksActions.loadBooks, (state: BooksState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(BooksActions.loadBooksSuccess, (state: BooksState, {booksBoList}) => {
    return {
      ...state,
      [BOOKS_KEY]: booksBoList,
      status: HttpStatusEnum.success
    }
  }),
  on(BooksActions.loadBooksError, (state: BooksState, {error}) => {
    return {
      ...state,
      error: error,
      status: HttpStatusEnum.error
    }
  }),
  on(BooksActions.createBooks, (state: BooksState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(BooksActions.createBooksSuccess, (state: BooksState) => {
    return {
      ...state,
      status: HttpStatusEnum.success
    }
  }),
  on(BooksActions.createBooksError, (state: BooksState, {error}) => {
    return {
      ...state,
      error: error,
      status: HttpStatusEnum.error
    }
  }),
)
