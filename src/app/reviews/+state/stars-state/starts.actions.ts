import { createActionGroup, props } from '@ngrx/store';
import { TotalStarsCountsBo } from '../../bo/total-stars-counts.bo';

export const StartsActions = createActionGroup({
  source: 'stars',
  events: {
    'load total stars levels percentages': props<{ bookId: string }>(),
    'load total stars levels percentages success': props<{ totalStarsCountsBo: TotalStarsCountsBo }>(),
    'load total stars levels percentages error': props<{ error: string }>()
  }
})
