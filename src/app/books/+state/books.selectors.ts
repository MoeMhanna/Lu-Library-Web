import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BOOKS_KEY, BooksState } from './books.reducers';

export const selectBooks = createFeatureSelector<BooksState>(BOOKS_KEY);
export const selectBooksLoaded = createSelector(selectBooks, (state: BooksState) => state);
