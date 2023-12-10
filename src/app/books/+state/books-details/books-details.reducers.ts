import { Action, createReducer, on } from '@ngrx/store';
import { BooksDetailsActions } from './books-details.actions';
import { BookBo } from '../../bo/book.bo';
import { HttpStatusEnum } from '../../../shared/enums/http-status.enum';

export const BOOK_DETAILS_KEY = 'booksDetails';

export interface BooksDetailsState {
  [BOOK_DETAILS_KEY]: BookBo;
  error: string;
  status: HttpStatusEnum;
}

const BooksInitialState: BooksDetailsState = {
  [BOOK_DETAILS_KEY]: null,
  error: null,
  status: HttpStatusEnum.pending
};

export const BookDetailsReducer = createReducer<BooksDetailsState, Action>(BooksInitialState,
  on(BooksDetailsActions.loadBookDetails, (state: BooksDetailsState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(BooksDetailsActions.loadBooksDetailsSuccess, (state: BooksDetailsState, {booksBo}) => {
    return {
      ...state,
      [BOOK_DETAILS_KEY]: booksBo,
      status: HttpStatusEnum.success
    }
  }),
  on(BooksDetailsActions.loadBooksDetailsError, (state: BooksDetailsState, {error}) => {
    return {
      ...state,
      error: error,
      status: HttpStatusEnum.error
    }
  })
)
