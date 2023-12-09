import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BOOK_DETAILS_KEY, BooksDetailsState } from './books-details.reducers';

export const selectBookDetails = createFeatureSelector<BooksDetailsState>(BOOK_DETAILS_KEY);
export const selectBookDetailsLoaded = createSelector(selectBookDetails, (state: BooksDetailsState) => state);
