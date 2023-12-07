import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ReviewsBo } from '../bo/reviews.bo';
import { TotalStarsCountsBo } from '../bo/total-stars-counts.bo';

export const ReviewsActions = createActionGroup({
  source: 'reviews',
  events: {
    'load reviews': props<{ bookId: string, stringId: string }>(),
    'load reviews success': props<{ reviewsBoList: Array<ReviewsBo> }>(),
    'load reviews error': props<{ error: string }>(),

    'create review': props<{ bookId: string, userId: string, reviewsForCreationFormValue: any }>(),
    'create review success': emptyProps(),
    'create review error': props<{ error: string }>(),

    'load total stars levels percentages': props<{ bookId: string }>(),
    'load total stars levels percentages success': props<{ totalStarsCountsBo: TotalStarsCountsBo }>(),
    'load total stars levels percentages error': props<{ error: string }>()
  }
})
