import { createActionGroup, props } from '@ngrx/store';
import { BookBo } from '../../bo/book.bo';

export const BooksDetailsActions = createActionGroup({
  source: 'books details',
  events: {
    'load book details': props<{ bookId: string }>(),
    'load books details success': props<{ booksBo: BookBo }>(),
    'load books details error': props<{ error: string }>()
  }
})
