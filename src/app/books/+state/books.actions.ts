import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BookBo } from '../bo/book.bo';

export const BooksActions = createActionGroup({
  source: 'books',
  events: {
    'load books': emptyProps(),
    'load books success': props<{ booksBoList: Array<BookBo> }>(),
    'load books error': props<{ error: string }>(),

    'create books': props<{ bookForUploadFormValue: any, bookFile: File }>(),
    'create books success': emptyProps(),
    'create books error': props<{ error: string }>(),
  }
})
